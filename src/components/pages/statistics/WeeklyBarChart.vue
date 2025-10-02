<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'

interface WeeklyData {
  name: string
  value: number
}

interface Props {
  data: WeeklyData[]
}

defineProps<Props>()
</script>

<template>
  <BarChart
    class="h-64"
    :data="data"
    :categories="['value']"
    index="name"
    :rounded-corners="10"
    :colors="['#2563eb']"
    :display-names="['Монет']"
    :show-legend="false"
  />
</template>

