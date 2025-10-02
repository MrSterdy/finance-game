<script setup lang="ts">
import { computed, ref } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DayData {
  date: number
  month: 'prev' | 'current' | 'next'
  coins: number
  fullDate: string
}

const props = defineProps<{
  // Данные о заработанных монетах: { '2025-10-01': 50, '2025-10-02': 120, ... }
  coinsData?: Record<string, number>
}>()

const currentDate = new Date()
const selectedMonth = ref(currentDate.getMonth())
const selectedYear = ref(currentDate.getFullYear())

const dayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

// Генерация календарной сетки
const calendarDays = computed(() => {
  const year = selectedYear.value
  const month = selectedMonth.value
  
  // Первый день месяца
  const firstDay = new Date(year, month, 1)
  const firstDayOfWeek = firstDay.getDay() // 0 = воскресенье
  
  // Последний день месяца
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  
  // Последний день предыдущего месяца
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  
  const days: DayData[] = []
  
  // Добавляем дни предыдущего месяца
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonthLastDay - i
    const dateStr = formatDateKey(year, month - 1, date)
    days.push({
      date,
      month: 'prev',
      coins: props.coinsData?.[dateStr] || 0,
      fullDate: dateStr
    })
  }
  
  // Добавляем дни текущего месяца
  for (let date = 1; date <= daysInMonth; date++) {
    const dateStr = formatDateKey(year, month, date)
    
    days.push({
      date,
      month: 'current',
      coins: props.coinsData?.[dateStr] || 0,
      fullDate: dateStr
    })
  }
  
  // Добавляем дни следующего месяца для заполнения сетки
  const remainingDays = 7 - (days.length % 7)
  if (remainingDays < 7) {
    for (let date = 1; date <= remainingDays; date++) {
      const dateStr = formatDateKey(year, month + 1, date)
      days.push({
        date,
        month: 'next',
        coins: props.coinsData?.[dateStr] || 0,
        fullDate: dateStr
      })
    }
  }
  
  // Разбиваем на недели
  const weeks: DayData[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  
  return weeks
})

function formatDateKey(year: number, month: number, date: number): string {
  // Обработка переполнения месяцев
  const d = new Date(year, month, date)
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  
  const monthStr = m < 10 ? `0${m}` : `${m}`
  const dateStr = day < 10 ? `0${day}` : `${day}`
  return `${y}-${monthStr}-${dateStr}`
}

function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${day}.${month}.${year}`
}

// Получение интенсивности цвета на основе количества монет
function getIntensityClass(coins: number, month: 'prev' | 'current' | 'next'): string {
  if (month !== 'current') return ''
  
  if (coins === 0) return ''
  if (coins < 20) return 'bg-blue-200'
  if (coins < 50) return 'bg-blue-400'
  if (coins < 100) return 'bg-blue-500'
  return 'bg-blue-600'
}

function getTextColor(coins: number, month: 'prev' | 'current' | 'next'): string {
  if (month !== 'current') return 'text-gray-400'
  if (coins === 0) return 'text-black'
  if (coins < 20) return 'text-black'
  return 'text-white'
}
</script>

<template>
  <div class="w-full">
    <!-- Заголовки дней недели -->
    <div class="grid grid-cols-7 gap-2 mb-2">
      <div
        v-for="day in dayNames"
        :key="day"
        class="text-center text-gray-500 text-xs font-semibold uppercase tracking-wider"
      >
        {{ day }}
      </div>
    </div>
    
    <!-- Сетка календаря -->
    <div class="flex flex-col gap-2">
      <div
        v-for="(week, weekIndex) in calendarDays"
        :key="weekIndex"
        class="grid grid-cols-7 gap-2"
      >
        <Popover
          v-for="(day, dayIndex) in week"
          :key="`${weekIndex}-${dayIndex}`"
        >
          <PopoverTrigger as-child>
            <button
              class="aspect-square flex items-center justify-center rounded-lg font-semibold text-base transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
              :class="[
                getIntensityClass(day.coins, day.month),
                getTextColor(day.coins, day.month)
              ]"
            >
              {{ day.date }}
            </button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Card class="text-sm py-2 gap-0 border-0 shadow-none">
              <CardHeader class="px-3 !pb-0 !pt-0 border-b">
                <CardTitle>
                  {{ formatDateDisplay(day.fullDate) }}
                </CardTitle>
              </CardHeader>
              <CardContent class="px-3 pt-1 flex flex-col gap-1">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <span class="w-2.5 h-2.5 mr-2">
                      <svg width="100%" height="100%" viewBox="0 0 30 30">
                        <path
                          d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                          :stroke="getIntensityClass(day.coins, day.month) ? '#2563eb' : '#e5e7eb'"
                          :fill="getIntensityClass(day.coins, day.month) ? '#2563eb' : '#e5e7eb'"
                          stroke-width="1"
                        />
                      </svg>
                    </span>
                    <span>Монет</span>
                  </div>
                  <span class="font-semibold ml-4">{{ day.coins }}</span>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
</template>

