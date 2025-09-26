<script setup lang="ts">
import { Button } from '@/components/ui/button';

const emit = defineEmits<{
  next: []
}>();

const handleNext = () => {
  emit('next');
};
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="pt-38 pb-69"></div>
    <div class="h-5"></div>
    <section class="px-4 pt-3 pb-4 flex flex-col gap-4 flex-grow justify-between">
        <div class="flex flex-col gap-3">
            <h1 class="font-semibold text-3xl">Не теряйте достигнутого прогресса</h1>
            <p>Заходите в игру каждый день, чтобы получать дополнительные монеты и открыть новые призы</p>
        </div>
        <Button size="lg" class="text-base" @click="handleNext">Начать игру</Button>
    </section>
  </div>
</template>