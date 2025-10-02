<script setup lang="ts">
import { computed, ref } from "vue"
import { Icon } from '@/components/ui/icon'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CalendarHeatmap from "@/components/pages/statistics/CalendarHeatmap.vue"
import WeeklyBarChart from "@/components/pages/statistics/WeeklyBarChart.vue"
import HalfYearlyAreaChart from "@/components/pages/statistics/HalfYearlyAreaChart.vue"

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

// Тестовые данные для календаря (формат: 'YYYY-MM-DD': количество_монет)
const testCalendarData: Record<string, number> = {
  '2025-10-01': 15,
  '2025-10-02': 30,
  '2025-10-03': 45,
  '2025-10-04': 20,
  '2025-10-05': 60,
  '2025-10-12': 80,
  '2025-10-13': 95,
  '2025-10-14': 110,
  '2025-10-15': 120,
  '2025-10-16': 85,
  '2025-10-17': 90,
  '2025-10-18': 100,
  '2025-10-19': 105,
}

function switchBlock(block: 'week' | 'month' | 'allTime') {
  activeBlock.value = block
}
</script>

<template>
  <div class="flex min-h-dvh bg-stone-100">
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
      <header class="grid grid-cols-3 gap-4 p-4 items-center">
        <RouterLink class="text-muted-foreground" :to="{ name: 'start-screen' }">
          <Icon name="arrow-left" />
        </RouterLink>
        <h1 class="font-semibold text-xl text-center">Статистика</h1>
      </header>

      <nav class="flex items-center justify-center gap-2">
        <Button
          class="bg-white text-blue-600 hover:bg-blue-100 shadow-none px-3 rounded-lg h-9 text-base"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-600/90': activeBlock === 'allTime' }"
          @click="switchBlock('allTime')"
        >
          Всё время
        </Button>
        <Button
          class="bg-white text-blue-600 hover:bg-blue-100 shadow-none px-3 rounded-lg h-9 text-base"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-600/90': activeBlock === 'month' }"
          @click="switchBlock('month')"
        >
          Месяц
        </Button>
        <Button
          class="bg-white text-blue-600 hover:bg-blue-100 shadow-none px-3 rounded-lg h-9 text-base"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-600/90': activeBlock === 'week' }"
          @click="switchBlock('week')"
        >
          Неделя
        </Button>
      </nav>

<!--      Разные календарики диограмки-->
      <section class="p-4">
        <div class="bg-white flex flex-col gap-4 rounded-xl py-3 px-4">
          <div class="flex flex-col">
            <h3 class="font-semibold">Монет заработано</h3>
            <span class="text-muted-foreground text-sm">{{ activeBlockLabel }}</span>
          </div>
          <WeeklyBarChart v-if="activeBlock === 'week'" />
          <CalendarHeatmap 
            v-if="activeBlock === 'month'"
            :coins-data="testCalendarData"
          />
          <HalfYearlyAreaChart v-if="activeBlock === 'allTime'" />
        </div>
      </section>

      <ul class="flex flex-col w-full px-4 pb-4">
        <li class="flex items-start gap-4 bg-background py-2 pl-2 pr-5 rounded-t-2xl">
          <div class="bg-blue-200 rounded-lg p-3">
            <Icon name="controller-stick" class="text-blue-600 size-5" />
          </div>
          <div class="flex flex-grow flex-col gap-3">
            <div class="flex justify-between gap-4 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold">Игр сыграно</span>
                <span class="text-muted-foreground text-base/4">в штуках</span>
              </div>
              <span class="mt-3 text-xl font-semibold">34</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 bg-background pb-2 pl-2 pr-5">
          <div class="bg-blue-200 rounded-lg p-3">
            <Icon name="chat-bubble" class="text-blue-600 size-5" />
          </div>
          <div class="flex flex-grow flex-col gap-3">
            <div class="flex justify-between gap-4 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold">Дано ответов</span>
                <span class="text-muted-foreground text-base/4">в штуках</span>
              </div>
              <span class="mt-3 text-xl font-semibold">96</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 bg-background pb-2 pl-2 pr-5">
          <div class="bg-blue-200 rounded-lg p-3">
            <Icon name="thumbs-up" class="text-blue-600 size-5" />
          </div>
          <div class="flex flex-grow flex-col gap-3">
            <div class="flex justify-between gap-4 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold">Правильных ответов</span>
                <span class="text-muted-foreground text-base/4">в штуках</span>
              </div>
              <span class="mt-3 text-xl font-semibold">48</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 bg-background pb-2 pl-2 pr-5">
          <div class="bg-blue-200 rounded-lg p-3">
            <Icon name="stopwatch" class="text-blue-600 size-5" />
          </div>
          <div class="flex flex-grow flex-col gap-3">
            <div class="flex justify-between gap-4 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold">Среднее время ответа</span>
                <span class="text-muted-foreground text-base/4">в секундах</span>
              </div>
              <span class="mt-3 text-xl font-semibold">16.4с</span>
            </div>
            <Separator class="!w-[calc(100%+4px)] -ml-1" />
          </div>
        </li>
        <li class="flex items-start gap-4 bg-background pb-2 pl-2 pr-5 rounded-b-2xl">
          <div class="bg-blue-200 rounded-lg p-3">
            <Icon name="flame" class="text-blue-600 size-5" />
          </div>
          <div class="flex flex-grow flex-col gap-3">
            <div class="flex justify-between gap-4 items-center w-full">
              <div class="flex flex-col w-full">
                <span class="font-semibold">Максимальный стрик</span>
                <span class="text-muted-foreground text-base/4 pb-1">в днях</span>
              </div>
              <span class="mt-3 text-xl font-semibold">3</span>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>

</style>