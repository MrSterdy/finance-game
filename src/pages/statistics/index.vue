<script setup lang="ts">
import { computed, ref } from "vue"
import { Icon } from '@/components/ui/icon'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CalendarHeatmap from "@/components/pages/statistics/CalendarHeatmap.vue"
import WeeklyBarChart from "@/components/pages/statistics/WeeklyBarChart.vue"
import HalfYearlyAreaChart from "@/components/pages/statistics/HalfYearlyAreaChart.vue"
import { profile } from '@/lib/storage/profile'
import { getLastWeekDates, getDayName, getMonthName, isInCurrentWeek, isInCurrentMonth } from '@/lib/utils/date'

const activeBlock = ref<'week' | 'month' | 'allTime'>('week')
const activeBlockLabel = computed(() => {
  switch (activeBlock.value) {
    case 'week':
      return 'за неделю'
    case 'month':
      return 'за месяц'
    case 'allTime':
      return 'за всё время'
  }
})

// Фильтрованные игры в зависимости от периода
const filteredGames = computed(() => {
  const games = profile.value.statistics.gamesPlayed
  
  switch (activeBlock.value) {
    case 'week':
      return games.filter(game => isInCurrentWeek(game.date))
    case 'month':
      return games.filter(game => isInCurrentMonth(game.date))
    case 'allTime':
    default:
      return games
  }
})

// Данные для календаря (формат: 'YYYY-MM-DD': количество_монет)
const calendarData = computed(() => {
  const data: Record<string, number> = {}
  profile.value.statistics.gamesPlayed.forEach(game => {
    data[game.date] = game.score
  })
  return data
})

// Игр сыграно
const gamesPlayed = computed(() => filteredGames.value.length)

// Дано ответов (всего вопросов)
const totalAnswers = computed(() => {
  return filteredGames.value.reduce((sum, game) => sum + game.totalQuestions, 0)
})

// Правильных ответов
const correctAnswers = computed(() => {
  return filteredGames.value.reduce((sum, game) => sum + game.correctAnswers, 0)
})

// Среднее время ответа
const averageAnswerTime = computed(() => {
  if (filteredGames.value.length === 0) return '0.0'
  const totalAvg = filteredGames.value.reduce((sum, game) => sum + game.averageAnswerTime, 0)
  return (totalAvg / filteredGames.value.length).toFixed(1)
})

// Максимальный стрик (для периодов показываем количество дней с играми)
const maxStreak = computed(() => {
  if (activeBlock.value === 'allTime') {
    return profile.value.statistics.maxStreak
  }
  
  // Для недели и месяца считаем дни подряд в рамках периода
  const games = filteredGames.value
  if (games.length === 0) return 0
  
  // Сортируем игры по дате
  const sortedDates = games.map(g => g.date).sort()
  
  let currentStreak = 1
  let maxStreakInPeriod = 1
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1])
    const currDate = new Date(sortedDates[i])
    
    // Вычисляем разницу в днях
    const diffTime = currDate.getTime() - prevDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    
    if (diffDays === 1) {
      currentStreak++
      maxStreakInPeriod = Math.max(maxStreakInPeriod, currentStreak)
    } else {
      currentStreak = 1
    }
  }
  
  return maxStreakInPeriod
})

// Данные для недельного графика
const weeklyChartData = computed(() => {
  const weekDates = getLastWeekDates()
  const gamesMap = new Map(
    profile.value.statistics.gamesPlayed.map(game => [game.date, game.score])
  )
  
  return weekDates.map(dateStr => {
    const date = new Date(dateStr)
    const dayName = getDayName(date.getDay())
    const value = gamesMap.get(dateStr) || 0
    
    return { name: dayName, value }
  })
})

// Данные для полугодового графика
const yearlyChartData = computed(() => {
  const data: Record<number, Array<{ name: string; value: number }>> = {}
  
  // Группируем игры по годам и месяцам
  profile.value.statistics.gamesPlayed.forEach(game => {
    const date = new Date(game.date)
    const year = date.getFullYear()
    const month = date.getMonth()
    
    if (!data[year]) {
      data[year] = Array.from({ length: 12 }, (_, i) => ({
        name: getMonthName(i),
        value: 0
      }))
    }
    
    data[year][month].value += game.score
  })
  
  // Если нет данных, создаём пустой массив для текущего года
  if (Object.keys(data).length === 0) {
    const currentYear = new Date().getFullYear()
    data[currentYear] = Array.from({ length: 12 }, (_, i) => ({
      name: getMonthName(i),
      value: 0
    }))
  }
  
  return data
})

function switchBlock(block: 'week' | 'month' | 'allTime') {
  activeBlock.value = block
}
</script>

<template>
  <div class="flex min-h-dvh bg-stone-100">
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden portrait:max-w-full portrait:px-0">
      <header class="grid grid-cols-3 gap-4 p-4 portrait:p-3 portrait:py-2 items-center">
        <RouterLink class="text-muted-foreground" :to="{ name: 'start-screen' }">
          <Icon name="arrow-left" class="portrait:w-5 portrait:h-5" />
        </RouterLink>
        <h1 class="font-semibold text-xl portrait:text-lg text-center">Статистика</h1>
      </header>

      <nav class="flex items-center justify-center gap-2 portrait:gap-1.5 portrait:px-4">
        <Button
          class="bg-white text-blue-600 hover:bg-blue-100 shadow-none px-3 portrait:px-2 rounded-lg h-9 portrait:h-8 text-base portrait:text-sm"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-600/90': activeBlock === 'allTime' }"
          @click="switchBlock('allTime')"
        >
          Всё время
        </Button>
        <Button
          class="bg-white text-blue-600 hover:bg-blue-100 shadow-none px-3 portrait:px-2 rounded-lg h-9 portrait:h-8 text-base portrait:text-sm"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-600/90': activeBlock === 'month' }"
          @click="switchBlock('month')"
        >
          Месяц
        </Button>
        <Button
          class="bg-white text-blue-600 hover:bg-blue-100 shadow-none px-3 portrait:px-2 rounded-lg h-9 portrait:h-8 text-base portrait:text-sm"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-600/90': activeBlock === 'week' }"
          @click="switchBlock('week')"
        >
          Неделя
        </Button>
      </nav>

<!--      Разные календарики диограмки-->
      <section class="p-4 portrait:px-6 portrait:py-3">
        <div class="bg-white flex flex-col gap-4 portrait:gap-3 rounded-xl py-3 portrait:py-2 px-4 portrait:px-3">
          <div class="flex flex-col">
            <h3 class="font-semibold portrait:text-sm">Монет заработано</h3>
            <span class="text-muted-foreground text-sm portrait:text-xs">{{ activeBlockLabel }}</span>
          </div>
          <WeeklyBarChart 
            v-if="activeBlock === 'week'"
            :data="weeklyChartData"
          />
          <CalendarHeatmap 
            v-if="activeBlock === 'month'"
            :coins-data="calendarData"
          />
          <HalfYearlyAreaChart 
            v-if="activeBlock === 'allTime'"
            :yearly-data="yearlyChartData"
          />
        </div>
      </section>

      <ul class="flex flex-col w-full px-4 portrait:px-6 pb-4 portrait:pb-6">
        <li class="flex items-start gap-4 portrait:gap-3 bg-background py-2 pl-2 pr-5 portrait:pr-4 rounded-t-2xl">
          <div class="bg-blue-200 rounded-lg px-3.5 portrait:px-3 py-3 portrait:py-2.5 aspect-square">
            <Icon name="controller-stick" class="text-blue-600 size-5 portrait:size-4" />
          </div>
          <div class="flex flex-grow flex-col gap-3 portrait:gap-2">
            <div class="flex justify-between gap-4 portrait:gap-3 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold portrait:text-sm">Игр сыграно</span>
                <span class="text-muted-foreground text-base/4 portrait:text-sm/4">в штуках</span>
              </div>
              <span class="mt-3 portrait:mt-2 text-xl portrait:text-lg font-semibold">{{ gamesPlayed }}</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 portrait:gap-3 bg-background pb-2 pl-2 pr-5 portrait:pr-4">
          <div class="bg-blue-200 rounded-lg px-3.5 portrait:px-3 py-3 portrait:py-2.5">
            <Icon name="chat-bubble" class="text-blue-600 size-5 portrait:size-4" />
          </div>
          <div class="flex flex-grow flex-col gap-3 portrait:gap-2">
            <div class="flex justify-between gap-4 portrait:gap-3 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold portrait:text-sm">Дано ответов</span>
                <span class="text-muted-foreground text-base/4 portrait:text-sm/4">в штуках</span>
              </div>
              <span class="mt-3 portrait:mt-2 text-xl portrait:text-lg font-semibold">{{ totalAnswers }}</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 portrait:gap-3 bg-background pb-2 pl-2 pr-5 portrait:pr-4">
          <div class="bg-blue-200 rounded-lg px-3.5 portrait:px-3 py-3 portrait:py-2.5">
            <Icon name="thumbs-up" class="text-blue-600 size-5 portrait:size-4" />
          </div>
          <div class="flex flex-grow flex-col gap-3 portrait:gap-2">
            <div class="flex justify-between gap-4 portrait:gap-3 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold portrait:text-sm">Правильных ответов</span>
                <span class="text-muted-foreground text-base/4 portrait:text-sm/4">в штуках</span>
              </div>
              <span class="mt-3 portrait:mt-2 text-xl portrait:text-lg font-semibold">{{ correctAnswers }}</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 portrait:gap-3 bg-background pb-2 pl-2 pr-5 portrait:pr-4">
          <div class="bg-blue-200 rounded-lg px-3.5 portrait:px-3 py-3 portrait:py-2.5">
            <Icon name="stopwatch" class="text-blue-600 size-5 portrait:size-4" />
          </div>
          <div class="flex flex-grow flex-col gap-3 portrait:gap-2">
            <div class="flex justify-between gap-4 portrait:gap-3 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold portrait:text-sm">Среднее время ответа</span>
                <span class="text-muted-foreground text-base/4 portrait:text-sm/4">в секундах</span>
              </div>
              <span class="mt-3 portrait:mt-2 text-xl portrait:text-lg font-semibold">{{ averageAnswerTime }}</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 portrait:gap-3 bg-background pb-2 pl-2 pr-5 portrait:pr-4 rounded-b-2xl">
          <div class="bg-blue-200 rounded-lg px-3.5 portrait:px-3 py-3 portrait:py-2.5">
            <Icon name="flame" class="text-blue-600 size-5 portrait:size-4" />
          </div>
          <div class="flex flex-grow flex-col gap-3 portrait:gap-2">
            <div class="flex justify-between gap-4 portrait:gap-3 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold portrait:text-sm">Максимальный стрик</span>
                <span class="text-muted-foreground text-base/4 portrait:text-sm/4 pb-1">в днях</span>
              </div>
              <span class="mt-3 portrait:mt-2 text-xl portrait:text-lg font-semibold">{{ maxStreak }}</span>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>

</style>