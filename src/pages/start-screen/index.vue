<script setup lang="ts">
import TrophyMiscellaneousSrc from '@/assets/images/miscellaneous/trophy.png';
import GiftMiscellaneousSrc from '@/assets/images/miscellaneous/gift.png';
import CoinMiscellaneousSrc from '@/assets/images/miscellaneous/coin.png';
import DogCharactersSrc from '@/assets/images/characters/dog.png';
import FoxCharactersSrc from '@/assets/images/characters/fox.png';
import MonkeyCharactersSrc from '@/assets/images/characters/monkey.png';
import SheepCharactersSrc from '@/assets/images/characters/sheep.png';
import WolfCharactersSrc from '@/assets/images/characters/wolf.png';
import {Button} from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { profile } from '@/lib/storage/profile';
import { computed } from 'vue';

// Вычисляем текст для отображения streak
const streakText = computed(() => {
  const streak = profile.value.statistics.streak
  if (streak === 0) return '0 дней'
  if (streak === 1) return '1 день'
  if (streak >= 2 && streak <= 4) return `${streak} дня`
  return `${streak} дней`
})

// Текущий день (для отображения)
const currentDay = computed(() => {
  return profile.value.statistics.gamesPlayed.length + 1
})

// Баланс монет
const balance = computed(() => profile.value.balance)
</script>

<template>
  <div
      class="flex min-h-dvh transition-colors duration-500 ease-in-out bg-stone-100"
  >
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
      <header class="flex justify-center p-4">
        <h1 class="font-semibold text-xl text-center">Игра</h1>
      </header>

      <section class="px-4 py-2 relative overflow-hidden">
        <RouterLink :to="{ name: 'statistics' }">
          <div class="bg-white rounded-xl px-4 py-2 relative overflow-hidden">
            <div class="font-semibold">Статистика</div>
            <div class="text-muted-foreground">Ваш прогресс в игре</div>
            <img :src="TrophyMiscellaneousSrc" alt="trophy" class="absolute right-0 bottom-0 w-20">
          </div>
        </RouterLink>
      </section>

      <section class="px-4 py-2">
        <div class="bg-white rounded-xl px-4 py-6 overflow-hidden flex flex-col gap-12">
          <Badge class="bg-orange-100 flex gap-2 text-base w-fit rounded-lg items-center text-orange-500 px-2 m-auto font-semibold">
            <Icon name="flame-gradient" class="!size-4" />
            {{ streakText }}
          </Badge>

          <div class="flex flex-col gap-4">
            <div class="font-semibold text-center text-xl">
              День {{ currentDay }}
            </div>

            <div class="text-muted-foreground text-center leading-5">
              Темы: ипотека, страхование, <br/>
              дивиденды, устройство банка
            </div>

            <div class="relative flex m-auto">
              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center z-10">
                <img :src="WolfCharactersSrc" alt="wolf" class="h-8">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-20">
                <img :src="MonkeyCharactersSrc" alt="monkey" class="h-8">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-30">
                <img :src="SheepCharactersSrc" alt="sheep" class="h-8">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-40">
                <img :src="FoxCharactersSrc" alt="fox" class="h-8">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-50">
                <img :src="DogCharactersSrc" alt="dog" class="h-8">
              </div>
            </div>
          </div>

          <Button class="w-full text-base glare" size="lg" asChild>
            <RouterLink :to="{ name: 'session' }">
              Начать день
            </RouterLink>
          </Button>
        </div>
      </section>

      <section class="px-4 py-2 flex gap-2">
        <div class="bg-white rounded-xl p-4 relative overflow-hidden w-full">
          <div class="font-semibold flex items-center gap-2">Обменять <img :src="CoinMiscellaneousSrc" alt="coin" class="w-5"> на призы</div>
          <div class="text-muted-foreground">от Газпромбанка</div>
          <img :src="GiftMiscellaneousSrc" alt="trophy" class="absolute -right-3 -bottom-7 w-20">
        </div>

        <div class="bg-primary rounded-xl p-4 flex flex-col flex-shrink-0">
          <div class="text-white font-semibold text-xl flex gap-2">
            {{ balance }} <img :src="CoinMiscellaneousSrc" alt="coin" class="w-6 object-contain">
          </div>
          <span class="text-muted-foreground">Баланс</span>
        </div>
      </section>
    </main>
  </div>
</template>
