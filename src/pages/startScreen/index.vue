<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter();

//Логика со стартом сессии
const startSession = () => {
  router.push('/session')
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
        >
          <path d="M9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L5.41422 13L9.70711 17.2929Z"/>
        </svg>

        <h1 class="font-semibold text-xl text-center">Статистика</h1>
      </header>

      <section class="px-4 pt-3 pb-4 flex flex-col gap-4 flex-grow justify-between">
        <!-- Основная информация -->
        <div></div>
<!--        <div class="flex flex-col gap-3">-->
<!--          <h1 class="font-semibold text-3xl">Помогите зверям изучить фин. грамотность</h1>-->
<!--          <p>Проверьте свои знания в области финансов и постарайтесь помочь всем животным с их финансовыми вопросами в формате увлекательной мини-игры</p>-->
<!--        </div>-->
        <Button size="lg" class="text-base" @click="startSession">Начать сессию</Button>
      </section>
    </main>
  </div>
</template>

<style scoped>

</style>