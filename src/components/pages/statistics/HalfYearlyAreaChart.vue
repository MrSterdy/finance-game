<script setup lang="ts">
import { computed, ref } from 'vue'
import { AreaChart } from '@/components/ui/chart-area'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() // 0-11
const currentHalf = currentMonth < 6 ? 1 : 2 // 1 = первое полугодие, 2 = второе

const selectedYear = ref(currentYear)
const selectedHalf = ref<1 | 2>(currentHalf)

// Тестовые данные по месяцам для разных годов
const yearlyData: Record<number, Array<{ name: string; value: number }>> = {
  2023: [
    { name: 'Янв', value: 45 },
    { name: 'Фев', value: 52 },
    { name: 'Мар', value: 48 },
    { name: 'Апр', value: 61 },
    { name: 'Май', value: 55 },
    { name: 'Июн', value: 67 },
    { name: 'Июл', value: 73 },
    { name: 'Авг', value: 69 },
    { name: 'Сен', value: 78 },
    { name: 'Окт', value: 85 },
    { name: 'Ноя', value: 92 },
    { name: 'Дек', value: 88 },
  ],
  2024: [
    { name: 'Янв', value: 95 },
    { name: 'Фев', value: 103 },
    { name: 'Мар', value: 110 },
    { name: 'Апр', value: 105 },
    { name: 'Май', value: 118 },
    { name: 'Июн', value: 125 },
    { name: 'Июл', value: 132 },
    { name: 'Авг', value: 128 },
    { name: 'Сен', value: 140 },
    { name: 'Окт', value: 145 },
    { name: 'Ноя', value: 150 },
    { name: 'Дек', value: 155 },
  ],
  2025: [
    { name: 'Янв', value: 160 },
    { name: 'Фев', value: 165 },
    { name: 'Мар', value: 172 },
    { name: 'Апр', value: 168 },
    { name: 'Май', value: 180 },
    { name: 'Июн', value: 185 },
    { name: 'Июл', value: 192 },
    { name: 'Авг', value: 188 },
    { name: 'Сен', value: 195 },
    { name: 'Окт', value: 210 },
    { name: 'Ноя', value: 0 },
    { name: 'Дек', value: 0 },
  ],
}

const chartData = computed(() => {
  const yearData = yearlyData[selectedYear.value]
  if (!yearData) return []
  
  // Первое полугодие: месяцы 0-5 (Янв-Июн)
  // Второе полугодие: месяцы 6-11 (Июл-Дек)
  const startIndex = selectedHalf.value === 1 ? 0 : 6
  const endIndex = startIndex + 6
  
  return yearData.slice(startIndex, endIndex)
})

const periodLabel = computed(() => {
  if (selectedHalf.value === 1) {
    return `Январь - Июнь ${selectedYear.value}`
  } else {
    return `Июль - Декабрь ${selectedYear.value}`
  }
})

function previousHalf() {
  if (selectedHalf.value === 1) {
    // Если первое полугодие, переходим ко второму полугодию предыдущего года
    selectedYear.value--
    selectedHalf.value = 2
  } else {
    // Если второе полугодие, переходим к первому полугодию того же года
    selectedHalf.value = 1
  }
}

function nextHalf() {
  if (selectedHalf.value === 1) {
    // Если первое полугодие, переходим ко второму полугодию того же года
    selectedHalf.value = 2
  } else {
    // Если второе полугодие, переходим к первому полугодию следующего года
    selectedYear.value++
    selectedHalf.value = 1
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        @click="previousHalf"
      >
        <Icon name="chevron-left" class="h-5 w-5" />
      </Button>
      <span class="font-semibold text-base">{{ periodLabel }}</span>
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        @click="nextHalf"
      >
        <Icon name="chevron-right" class="h-5 w-5" />
      </Button>
    </div>
    <AreaChart
      class="h-52"
      :data="chartData"
      :categories="['value']"
      index="name"
      :colors="['#2563eb']"
      :display-names="['Монет']"
      :show-legend="false"
    />
  </div>
</template>

