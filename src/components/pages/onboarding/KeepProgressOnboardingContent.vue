<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

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
    <div class="pt-38 pb-4 px-6 grid place-items-center">
      <!-- Календарь стрика с анимациями -->
      <div class="rounded-2xl p-6 w-full flex flex-col gap-6 bg-white animate-calendar-container">
        <!-- Центральная информация о стрике (анимируется) -->
        <div class="self-center flex flex-col gap-1 items-center text-center animate-streak-info">
          <Icon name="flame-gradient" class="size-8" />
          <span class="text-[#FA721A] font-bold text-6xl">5</span>
          <span class="font-semibold text-3xl text-[#FA721A] -mt-2">дней</span>
        </div>
        <!-- Сетка дней недели с индивидуальными анимациями -->
        <ul class="grid grid-cols-7 gap-4">
          <li class="flex flex-col items-center justify-center gap-2 animate-day-1">
            <span class="uppercase font-semibold text-lg text-[#FA721A]">Пн</span>
            <div class="rounded-full size-7 grid place-items-center bg-[#FA721A]">
              <Icon name="check" class="w-4 text-white" />
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-2 animate-day-2">
            <span class="uppercase font-semibold text-lg text-[#FA721A]">Вт</span>
            <div class="rounded-full size-7 grid place-items-center bg-[#FA721A]">
              <Icon name="check" class="w-4 text-white" />
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-2 animate-day-3">
            <span class="uppercase font-semibold text-lg text-[#FA721A]">Ср</span>
            <div class="rounded-full size-7 grid place-items-center bg-[#FA721A]">
              <Icon name="check" class="w-4 text-white" />
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-2 animate-day-4">
            <span class="uppercase font-semibold text-lg text-[#FA721A]">Чт</span>
            <div class="rounded-full size-7 grid place-items-center bg-[#FA721A]">
              <Icon name="check" class="w-4 text-white" />
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-2 animate-day-5">
            <span class="uppercase font-semibold text-lg text-[#FA721A]">Пт</span>
            <div class="rounded-full size-7 grid place-items-center bg-[#FA721A]">
              <Icon name="check" class="w-4 text-white" />
            </div>
          </li>
          <li class="flex flex-col items-center justify-center gap-2 animate-day-6">
            <span class="uppercase font-semibold text-lg text-muted-foreground">Сб</span>
            <div class="rounded-full size-7 grid place-items-center bg-stone-300"></div>
          </li>
          <li class="flex flex-col items-center justify-center gap-2 animate-day-7">
            <span class="uppercase font-semibold text-lg text-muted-foreground">Вс</span>
            <div class="rounded-full size-7 grid place-items-center bg-stone-300"></div>
          </li>
        </ul>
      </div>
    </div>
    
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

<style scoped>
/* === Анимации календаря и стрика === */

/* Анимация появления основного контейнера календаря */
@keyframes calendar-appear {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(30px); /* Начальное состояние: уменьшен и сдвинут вниз */
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0); /* Финальное состояние: нормальный размер и позиция */
  }
}

/* Анимация появления информации о стрике (огонь + цифры) */
@keyframes streak-bounce {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(20px); /* Начальное состояние: сильно уменьшен */
  }
  60% {
    opacity: 0.8;
    transform: scale(1.1) translateY(-5px); /* Промежуточное состояние: слегка увеличен */
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0); /* Финальное состояние */
  }
}

/* Анимация появления дней недели */
@keyframes day-pop {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(15px) rotate(-10deg); /* Начальное состояние с поворотом */
  }
  70% {
    opacity: 1;
    transform: scale(1.1) translateY(-3px) rotate(2deg); /* Промежуточное состояние */
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0) rotate(0deg); /* Финальное состояние */
  }
}

/* Анимация появления контента */
@keyframes content-fade {
  0% {
    opacity: 0;
    transform: translateY(20px); /* Сдвиг снизу */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Финальная позиция */
  }
}

/* Применяем анимации к элементам */

/* Основной контейнер календаря */
.animate-calendar-container {
  animation: calendar-appear 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

/* Информация о стрике */
.animate-streak-info {
  animation: streak-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s both;
}

/* Дни недели с нарастающими задержками */
.animate-day-1 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both;
}

.animate-day-2 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
}

.animate-day-3 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.0s both;
}

.animate-day-4 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.1s both;
}

.animate-day-5 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s both;
}

.animate-day-6 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.3s both;
}

.animate-day-7 {
  animation: day-pop 0.5s cubic-bezier(0.4, 0, 0.2, 1) 1.4s both;
}
</style>