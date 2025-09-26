<script setup lang="ts">
import { Button } from '@/components/ui/button';
import CoinSrc from '@/assets/images/miscellaneous/coin.png';
import GiftSrc from '@/assets/images/miscellaneous/gift.png';

const emit = defineEmits<{
  next: []
}>();

const handleNext = () => {
  emit('next');
};
</script>

<template>
    <div class="h-full flex flex-col">
        <section class="pt-38 pb-34 flex flex-col px-4">
            <ul class="flex gap-3">
                <li class="bg-background rounded-2xl flex flex-col gap-4 px-7 pt-5 pb-2 items-center flex-shrink-0 animate-gift-1">
                    <img :src="GiftSrc" alt="Подарок" class="h-16">
                    <p class="font-semibold text-2xl inline-flex items-center gap-2">
                        <img :src="CoinSrc" alt="Монета" class="h-6" />
                        {{ ' ' }}
                        5
                    </p>
                </li>
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
        <div class="h-5"></div>
        <section class="px-4 pt-3 pb-4 flex flex-col gap-4 flex-grow justify-between">
            <div class="flex flex-col gap-3">
                <h1 class="font-semibold text-3xl">Зарабатывайте монеты и тратьте их на призы</h1>
                <p>За каждый правильный ответ вы получаете монеты, которые можно потратить на мерч, новую категорию кэшбека и многое другое</p>
            </div>
            <Button size="lg" class="text-base" @click="handleNext">Далее</Button>
        </section>
    </div>
</template>

<style scoped>
@keyframes gift-popup {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-gift-1 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.animate-gift-2 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.animate-gift-3 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.animate-gift-4 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.animate-gift-5 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.animate-gift-6 {
  animation: gift-popup 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
}
</style>