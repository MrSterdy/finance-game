<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

// Тестовые данные по дням недели
const testData = [
  { name: 'Пн', value: 50 },
  { name: 'Вт', value: 30 },
  { name: 'Ср', value: 15 },
  { name: 'Чт', value: 43 },
  { name: 'Пт', value: 25 },
  { name: 'Сб', value: 7 },
  { name: 'Вс', value: 33 },
]
</script>

<template>
  <BarChart
    class="h-64"
    :data="testData"
    :categories="['value']"
    index="name"
    :rounded-corners="10"
    :colors="['#2563eb']"
    :display-names="['Монет']"
    :show-legend="false"
  />
</template>

