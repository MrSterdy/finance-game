<template>
  <div class="flex items-center">
    <!-- Минуты -->
    <Counter 
      :value="minutes" 
      :fontSize="fontSize"
      :places="[10, 1]"
      :gap="0"
      :padding="0"
      :horizontalPadding="0"
      textColor="currentColor"
      :fontWeight="fontWeight"
      :gradientHeight="0"
    />
    
    <!-- Разделитель -->
    <span :style="{ fontSize: fontSize + 'px', fontWeight: fontWeight }" class="mx-0.5">:</span>
    
    <!-- Секунды -->
    <Counter 
      :value="seconds" 
      :fontSize="fontSize"
      :places="[10, 1]"
      :gap="0"
      :padding="0"
      :horizontalPadding="0"
      textColor="currentColor"
      :fontWeight="fontWeight"
      :gradientHeight="0"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Counter from '@/components/ui/counter/Counter.vue'

interface Props {
  timeInSeconds: number
  fontSize?: number
  fontWeight?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  fontSize: 16,
  fontWeight: 600
})

const minutes = computed(() => Math.floor(props.timeInSeconds / 60))
const seconds = computed(() => props.timeInSeconds % 60)
</script>
