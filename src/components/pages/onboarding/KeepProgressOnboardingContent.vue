<script setup lang="ts">
import { Button } from '@/components/ui/button';

// Определяем эмиты для связи с родительским компонентом
const emit = defineEmits<{
  next: [] // Событие для завершения онбординга и начала игры
}>();

/**
 * Обработчик клика на кнопку "Начать игру"
 * Эмитит событие next для завершения онбординга
 */
const handleNext = () => {
  emit('next');
};
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Большой отступ сверху для визуального баланса -->
    <div class="pt-38 pb-69"></div>
    
    <!-- Декоративный отступ -->
    <div class="h-5"></div>
    
    <!-- Секция с финальным сообщением онбординга -->
    <section class="px-4 pt-3 pb-4 flex flex-col gap-4 flex-grow justify-between">
        <!-- Заключительная информация о важности постоянного прогресса -->
        <div class="flex flex-col gap-3">
            <h1 class="font-semibold text-3xl">Не теряйте достигнутого прогресса</h1>
            <p>Заходите в игру каждый день, чтобы получать дополнительные монеты и открыть новые призы</p>
        </div>
        <!-- Финальная кнопка для начала игры -->
        <Button size="lg" class="text-base" @click="handleNext">Начать игру</Button>
    </section>
  </div>
</template>