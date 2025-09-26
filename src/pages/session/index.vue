<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";
import {Badge} from "@/components/ui/badge";
import FoxCharacterSrc from '@/assets/images/characters/fox.png';
import CoinMiscellaneousSrc from '@/assets/images/miscellaneous/coin.png';
import TimerMiscellaneousSrc from '@/assets/images/miscellaneous/timer.png';
import CrossMiscellaneousSrc from '@/assets/images/miscellaneous/cross.png';
import CheckMiscellaneousSrc from '@/assets/images/miscellaneous/check.png';
import {ref} from "vue";

const router = useRouter()
const isFlipped = ref(false)

//Для переворота карточки с ответом
const next = () => {
  isFlipped.value = true
}

const leaveSession = () => {
  router.push('/start-screen')
}
</script>

<template>
  <!-- Основной контейнер с плавным переходом цвета фона -->
  <div
      class="flex min-h-dvh transition-colors duration-500 ease-in-out bg-stone-100"
  >
    <!-- Основная область контента с ограниченной шириной -->
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
      <!-- Шапка с индикаторами прогресса для каждого шага -->
      <header class="grid grid-cols-3 gap-1 py-4 p-4 items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-[#737373] hover:fill-gray-900 transition-colors duration-200 cursor-pointer"
            @click="leaveSession"
        >
          <path d="M9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L5.41422 13L9.70711 17.2929Z"/>
        </svg>

        <h1 class="font-semibold text-xl text-center">Сессия</h1>
      </header>

      <section class="pt-2 flex flex-col px-4">
        <div class="m-auto flex gap-2">
          <Badge class="px-5 text-xl font-semibold rounded-xl">
            <img :src="FoxCharacterSrc" alt="fox" class="w-6"> 1/5
          </Badge>
          <Badge class="px-5 text-xl font-semibold rounded-xl">
            <img :src="CoinMiscellaneousSrc" alt="coin" class="w-6"> 0
          </Badge>
        </div>
      </section>

      <section class="px-4 pt-12 pb-4 flex flex-col gap-4 flex-grow justify-between">
        <div>
<!--          Передняя часть -->
          <div class="card_container">
            <div class="flex flex-col gap-8 p-6 bg-white rounded-2xl transition-transform duration-500 transform-style preserve-3d">
              <Badge class="bg-blue-500/20 text-blue-600 px-3 w-full text-base font-semibold rounded-lg gap-4">
                <img :src="TimerMiscellaneousSrc" alt="timer" class="w-3.5"> 00:24
                <div class="w-full h-2 bg-blue-600 rounded-xl"></div>
              </Badge>
              <div class="flex flex-col gap-4">
                <img :src="FoxCharacterSrc" alt="fox" class="w-24 m-auto">
                <h2 class="text-xl text-center font-bold mt-2">Лиса</h2>
                <div class="text-center text-lg font-medium text-stone-400 leading-6">
                  Я заработала 10 000₽. Сколько у меня останется после уплаты налогов для физ. лиц?
                </div>
              </div>
            </div>

<!--            Задняя часть-->
            <div class="back hidden">
              контент
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <div class="text-center bg-white items-center rounded-2xl p-7 font-medium font-xl">
              4550₽
            </div>
            <div class="text-center bg-white items-center rounded-2xl p-7 font-medium font-xl">
              4550₽
            </div>

<!--            При не верном ответе-->
            <div class="text-center bg-red-300/35 text-red-600 items-center rounded-2xl p-7 font-medium font-xl relative">
              <img :src="CrossMiscellaneousSrc" alt="cross" class="w-5 absolute -right-1 -top-1">
              4550₽
            </div>
<!--            При верном ответе -->
            <div class="text-center bg-green-300/35 text-green-600 items-center rounded-2xl p-7 font-medium font-xl relative">
              <img :src="CheckMiscellaneousSrc" alt="check" class="w-5 absolute -right-1 -top-1">
              4550₽
            </div>
          </div>
        </div>
        <Button size="lg" class="text-base" @click="next">Далее</Button>
      </section>
    </main>
  </div>
</template>

<style scoped>
  .card_container{
    perspective: 600px;
  }
</style>