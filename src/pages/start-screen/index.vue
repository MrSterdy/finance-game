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
import Counter from '@/components/ui/counter/Counter.vue';
import { profile } from '@/lib/storage/profile';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { getDateString, getSecondsUntilMidnight } from '@/lib/utils/date';

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

// Проверяем, была ли игра сегодня
const isPlayedToday = computed(() => {
  const today = getDateString()
  return profile.value.statistics.gamesPlayed.some(game => game.date === today)
})

// Таймер до следующего дня
const secondsUntilMidnight = ref(getSecondsUntilMidnight())
const hours = computed(() => Math.floor(secondsUntilMidnight.value / 3600))
const minutes = computed(() => Math.floor((secondsUntilMidnight.value % 3600) / 60))
const seconds = computed(() => secondsUntilMidnight.value % 60)

let timerInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timerInterval = setInterval(() => {
    const newSeconds = getSecondsUntilMidnight()
    secondsUntilMidnight.value = newSeconds
    
    // Когда достигли полуночи, обновляем состояние
    if (newSeconds > secondsUntilMidnight.value + 3600) {
      // Произошло обновление дня
      location.reload()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div
      class="flex min-h-dvh transition-colors duration-500 ease-in-out bg-stone-100"
  >
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden portrait:max-w-full portrait:px-0">
      <header class="flex justify-center p-4 portrait:p-3 portrait:py-2">
        <h1 class="font-semibold text-xl portrait:text-lg text-center">Игра</h1>
      </header>

      <div class="px-4 portrait:px-6 py-2 portrait:py-1">
        <RouterLink class="bg-white rounded-xl px-5 portrait:px-4 py-4 portrait:py-3 relative overflow-hidden inline-flex w-full flex-col" :to="{ name: 'statistics' }">
            <div class="font-semibold portrait:text-sm">Статистика</div>
            <div class="text-muted-foreground portrait:text-xs">Ваш прогресс в игре</div>
            <img :src="TrophyMiscellaneousSrc" alt="trophy" class="absolute right-0 bottom-0 h-20 portrait:h-16">
        </RouterLink>
      </div>

      <section class="px-4 portrait:px-6 py-2 portrait:py-1">
        <div class="bg-white rounded-xl px-4 portrait:px-3 py-6 portrait:py-4 overflow-hidden flex flex-col gap-12 portrait:gap-6">
          <Badge class="bg-orange-100 flex gap-2 text-base portrait:text-sm w-fit rounded-lg items-center text-orange-500 px-2 m-auto font-semibold">
            <Icon name="flame-gradient" class="!size-4 portrait:!size-3" />
            {{ streakText }}
          </Badge>

          <div class="flex flex-col gap-4 portrait:gap-3">
            <div class="font-semibold text-center text-xl portrait:text-lg">
              День {{ currentDay }}
            </div>

            <div class="text-muted-foreground text-center leading-5 portrait:text-sm portrait:leading-relaxed">
              Темы: ипотека, страхование, <br/>
              дивиденды, устройство банка
            </div>

            <div class="relative flex m-auto portrait:scale-90">
              <div class="relative p-3 portrait:p-2 bg-gray-100 rounded-full flex items-center justify-center z-10">
                <img :src="WolfCharactersSrc" alt="wolf" class="h-8 portrait:h-6">
              </div>

              <div class="relative p-3 portrait:p-2 bg-gray-100 rounded-full flex items-center justify-center -ml-5 portrait:-ml-4 z-20">
                <img :src="MonkeyCharactersSrc" alt="monkey" class="h-8 portrait:h-6">
              </div>

              <div class="relative p-3 portrait:p-2 bg-gray-100 rounded-full flex items-center justify-center -ml-5 portrait:-ml-4 z-30">
                <img :src="SheepCharactersSrc" alt="sheep" class="h-8 portrait:h-6">
              </div>

              <div class="relative p-3 portrait:p-2 bg-gray-100 rounded-full flex items-center justify-center -ml-5 portrait:-ml-4 z-40">
                <img :src="FoxCharactersSrc" alt="fox" class="h-8 portrait:h-6">
              </div>

              <div class="relative p-3 portrait:p-2 bg-gray-100 rounded-full flex items-center justify-center -ml-5 portrait:-ml-4 z-50">
                <img :src="DogCharactersSrc" alt="dog" class="h-8 portrait:h-6">
              </div>
            </div>
          </div>

          <Button 
            v-if="!isPlayedToday"
            class="w-full text-base portrait:text-sm glare" 
            size="lg" 
            asChild
          >
            <RouterLink :to="{ name: 'session' }">
              Начать день
            </RouterLink>
          </Button>
          
          <div v-else class="w-full flex flex-col items-center gap-3 portrait:gap-2">
            <div class="flex items-center gap-2 portrait:gap-1 portrait:scale-90">
              <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                  <Counter 
                    :value="hours"
                    :font-size="32"
                    :places="[10, 1]"
                    :gap="4"
                    :horizontal-padding="0"
                    :padding="12"
                    text-color="currentColor"
                    font-weight="700"
                    :gradient-height="0"
                    :digit-style="{
                      backgroundColor: 'var(--color-muted)',
                      borderRadius: '8px',
                      width: '2ch'
                    }"
                    class="text-muted-foreground portrait:text-sm"
                  />
                  <span class="text-muted-foreground text-xs portrait:text-[10px] mt-1">часов</span>
                </div>
              </div>
              <span class="text-3xl portrait:text-2xl font-semibold text-muted-foreground pb-5 portrait:pb-4">:</span>
              <div class="flex flex-col items-center">
                <Counter 
                  :value="minutes"
                  :font-size="32"
                  :places="[10, 1]"
                  :gap="4"
                  :horizontal-padding="0"
                  :padding="12"
                  text-color="currentColor"
                  font-weight="700"
                  :gradient-height="0"
                  :digit-style="{
                    backgroundColor: 'var(--color-muted)',
                    borderRadius: '8px',
                    width: '2ch'
                  }"
                  class="text-muted-foreground portrait:text-sm"
                />
                <span class="text-muted-foreground text-xs portrait:text-[10px] mt-1">минут</span>
              </div>
              <span class="text-3xl portrait:text-2xl font-semibold text-muted-foreground pb-5 portrait:pb-4">:</span>
              <div class="flex flex-col items-center">
                <Counter 
                  :value="seconds"
                  :font-size="32"
                  :places="[10, 1]"
                  :gap="4"
                  :horizontal-padding="0"
                  :padding="12"
                  text-color="currentColor"
                  font-weight="700"
                  :gradient-height="0"
                  :digit-style="{
                    backgroundColor: 'var(--color-muted)',
                    borderRadius: '8px',
                    width: '2ch'
                  }"
                  class="text-muted-foreground portrait:text-sm"
                />
                <span class="text-muted-foreground text-xs portrait:text-[10px] mt-1">секунд</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="px-4 portrait:px-6 py-2 portrait:py-1 flex gap-2 portrait:gap-3 portrait:flex-col">
        <div class="bg-white rounded-xl px-5 portrait:px-4 py-4 portrait:py-3 relative overflow-hidden w-full portrait:flex portrait:justify-between portrait:items-center">
          <div class="portrait:flex-1">
            <div class="font-semibold portrait:text-sm flex items-center gap-2">Обменять <img :src="CoinMiscellaneousSrc" alt="coin" class="w-5 portrait:w-4"> на призы</div>
            <div class="text-muted-foreground portrait:text-xs">от Газпромбанка</div>
          </div>
          <img :src="GiftMiscellaneousSrc" alt="trophy" class="absolute portrait:relative -right-3 portrait:right-0 -bottom-7 portrait:bottom-0 w-20 portrait:w-16 portrait:flex-shrink-0">
        </div>

        <div class="bg-primary rounded-xl px-4 portrait:px-3 py-3.5 portrait:py-3 flex flex-col flex-shrink-0 portrait:flex-row portrait:justify-between portrait:items-center portrait:w-full">
          <div class="portrait:flex-1">
            <div class="text-white font-semibold text-xl portrait:text-lg flex gap-2 portrait:items-center">
              {{ balance }} <img :src="CoinMiscellaneousSrc" alt="coin" class="w-6 portrait:w-5 object-contain">
            </div>
            <span class="text-muted-foreground portrait:text-xs">Баланс</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
