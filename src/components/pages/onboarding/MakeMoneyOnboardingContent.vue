<script setup lang="ts">
import { Button } from '@/components/ui/button';
import CoinSrc from '@/assets/images/miscellaneous/coin.png';
import GiftSrc from '@/assets/images/miscellaneous/gift.png';

// Определяем эмиты для связи с родительским компонентом
const emit = defineEmits<{
  next: [] // Событие для перехода к следующему шагу
}>();

/**
 * Обработчик клика на кнопку "Далее"
 * Эмитит событие next для перехода к следующему шагу онбординга
 */
const handleNext = () => {
  emit('next');
};
</script>

<template>
    <div class="h-full flex flex-col">
        <!-- Секция с анимированными призами -->
        <section class="pt-38 pb-34 flex flex-col px-4">
            <!-- Список призов с монетами (анимируется с задержками) -->
            <ul class="flex gap-3">
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-1">
                    <!-- Изображение подарка -->
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <!-- Количество монет за приз -->
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        5
                    </p>
                </li>
                <!-- Призы с возрастающей стоимостью и анимациями -->
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-2">
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        20
                    </p>
                </li>
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-3">
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        75
                    </p>
                </li>
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-4">
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        100
                    </p>
                </li>
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-5">
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        125
                    </p>
                </li>
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-6">
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        150
                    </p>
                </li>
            </ul>
        </section>
        <!-- Декоративный отступ -->
        <div class="h-5"></div>
        
        <!-- Секция с описанием и кнопкой -->
        <section class="px-4 pt-3 pb-4 flex flex-col gap-4 flex-grow justify-between">
            <!-- Основная информация о системе наград -->
            <div class="flex flex-col gap-3">
                <h1 class="font-semibold text-3xl">Зарабатывайте монеты и тратьте их на призы</h1>
                <p>За каждый правильный ответ вы получаете монеты, которые можно потратить на мерч, новую категорию кэшбека и многое другое</p>
            </div>
            <!-- Кнопка для перехода к следующему шагу -->
            <Button size="lg" class="text-base" @click="handleNext">Далее</Button>
        </section>
    </div>
</template>

<style scoped>
/* === Анимации призов === */

/* Плавная анимация появления призов с popup эффектом */
@keyframes gift-popup {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px); /* Начальное состояние: уменьшен и сдвинут вниз */
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-5px); /* Промежуточное состояние: слегка увеличен и поднят */
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0); /* Финальное состояние: нормальный размер и позиция */
  }
}

/* Применяем анимацию к каждому призу с возрастающей задержкой */
.animate-gift-1 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both; /* Первый приз */
}

.animate-gift-2 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both; /* Второй приз */
}

.animate-gift-3 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both; /* Третий приз */
}

.animate-gift-4 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both; /* Четвертый приз */
}

.animate-gift-5 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both; /* Пятый приз */
}

.animate-gift-6 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both; /* Шестой приз */
}
</style>