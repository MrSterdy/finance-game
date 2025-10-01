<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import CoinMiscellaneousSrc from '@/assets/images/miscellaneous/coin.png';
import Progress from "@/components/ui/progress/Progress.vue";
import TimerCounter from "@/components/ui/time-counter/TimerCounter.vue";
import { useQuizSession } from '@/composables/useQuizSession'
import { computed, ref, watch } from 'vue'
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const {
  session,
  currentQuestion,
  currentQuestionIndex,
  selectedAnswerIndex,
  userScore,
  showAnswer,
  totalTime,
  timeLeft,
  selectAnswer,
  next
} = useQuizSession()

// Состояние для анимации переворота карточки
const isFlipped = ref(false)

// Обработчик выбора ответа с анимацией
const handleSelectAnswer = (index: number) => {
  selectAnswer(index)
  // Запускаем анимацию переворота после выбора ответа
  setTimeout(() => {
    isFlipped.value = true
  }, 50)
}

// Сбрасываем переворот при переходе к следующему вопросу
watch(currentQuestionIndex, () => {
  isFlipped.value = false
})

// Вычисляем процент оставшегося времени
const timePercentage = computed(() => {
  if (totalTime.value === 0) return 0
  return (timeLeft.value / totalTime.value) * 100
})

// Динамические цвета на основе оставшегося времени
const timerColors = computed(() => {
  const percentage = timePercentage.value
  
  if (percentage > 50) {
    // Синий цвет (больше 50% времени)
    return {
      badgeClass: 'bg-blue-200 text-blue-600',
      progressBgClass: 'bg-blue-300',
      progressIndicatorClass: 'bg-blue-600'
    }
  } else if (percentage > 25) {
    // Желтый цвет (25-50% времени)
    return {
      badgeClass: 'bg-yellow-200 text-yellow-700',
      progressBgClass: 'bg-yellow-300',
      progressIndicatorClass: 'bg-yellow-600'
    }
  } else {
    // Красный цвет (меньше 25% времени)
    return {
      badgeClass: 'bg-red-200 text-red-600',
      progressBgClass: 'bg-red-300',
      progressIndicatorClass: 'bg-red-600'
    }
  }
})

// Проверка правильности ответа для стилизации
const getAnswerClass = (answerIndex: number) => {
  if (!showAnswer.value || selectedAnswerIndex.value === null || !currentQuestion.value) {
    return 'text-center bg-white items-center rounded-2xl p-7 font-medium font-xl cursor-pointer hover:bg-gray-50 transition-colors'
  }
  
  const isCorrectAnswer = currentQuestion.value.question.options.correctEntryIndex === answerIndex
  const isSelectedAnswer = selectedAnswerIndex.value === answerIndex
  
  if (isSelectedAnswer) {
    if (isCorrectAnswer) {
      return 'text-center bg-green-300/35 text-green-600 items-center rounded-2xl p-7 font-medium font-xl relative'
    } else {
      return 'text-center bg-red-300/35 text-red-600 items-center rounded-2xl p-7 font-medium font-xl relative'
    }
  } else if (isCorrectAnswer && showAnswer.value) {
    return 'text-center bg-green-300/35 text-green-600 items-center rounded-2xl p-7 font-medium font-xl relative'
  }
  
  return 'text-center bg-white items-center rounded-2xl p-7 font-medium font-xl opacity-50'
}

// Показ иконки для ответа
const showAnswerIcon = (answerIndex: number) => {
  if (!showAnswer.value || selectedAnswerIndex.value === null || !currentQuestion.value) return false
  
  const isCorrectAnswer = currentQuestion.value.question.options.correctEntryIndex === answerIndex
  const isSelectedAnswer = selectedAnswerIndex.value === answerIndex
  
  return isSelectedAnswer || (isCorrectAnswer && showAnswer.value)
}

// Иконка для ответа (правильный/неправильный)
const getAnswerIcon = (answerIndex: number) => {
  if (!currentQuestion.value) return null
  
  const isCorrectAnswer = currentQuestion.value.question.options.correctEntryIndex === answerIndex
  const isSelectedAnswer = selectedAnswerIndex.value === answerIndex
  
  if (isSelectedAnswer && !isCorrectAnswer) {
    return 'cross' // неправильный ответ
  } else if (isCorrectAnswer) {
    return 'check' // правильный ответ
  }
  
  return null
}
</script>

<template>
  <div class="flex min-h-dvh transition-colors duration-500 ease-in-out bg-stone-100" v-if="session && currentQuestion">
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
      <header class="grid grid-cols-3 gap-1 py-4 p-4 items-center">
        <RouterLink class="text-muted-foreground" :to="{ name: 'start-screen' }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13L5.41422 13L9.70711 17.2929Z" fill="currentColor"/>
          </svg>
        </RouterLink>

        <h1 class="font-semibold text-xl text-center">Сессия</h1>
      </header>

      <section class="pt-2 flex flex-col px-4">
        <div class="m-auto flex gap-2">
          <Badge class="px-5 text-xl font-semibold rounded-xl">
            <img :src="currentQuestion.character.avatarUrl" :alt="currentQuestion.character.name" class="w-6">
            <span>{{ currentQuestionIndex + 1 }}/{{ session.items.length }}</span>
          </Badge>
          <Badge class="px-5 text-xl font-semibold rounded-xl">
            <img :src="CoinMiscellaneousSrc" alt="coin" class="w-6"> {{ userScore }}
          </Badge>
        </div>
      </section>

      <section class="px-4 pt-12 pb-4 flex flex-col gap-4 flex-grow justify-between">
        <div>
          <!-- Контейнер карточки с 3D perspective -->
          <div class="card-side card-front">
            <div class="flex flex-col gap-8 p-6 h-full bg-white rounded-2xl">
              <div class="flex items-center justify-between gap-8">
                <Badge
                :class="`${timerColors.badgeClass} px-3 text-base font-semibold rounded-lg transition-colors`"
              >
                  <svg class="!size-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_11_448)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666626 7.99996C0.666626 3.94987 3.94987 0.666626 7.99996 0.666626C12.05 0.666626 15.3333 3.94987 15.3333 7.99996C15.3333 12.05 12.05 15.3333 7.99996 15.3333C3.94987 15.3333 0.666626 12.05 0.666626 7.99996ZM11.6666 8.99996C12.0348 8.99996 12.3333 8.70148 12.3333 8.33329V7.66663C12.3333 7.29844 12.0348 6.99996 11.6666 6.99996H8.99996V2.99996C8.99996 2.63177 8.70148 2.33329 8.33329 2.33329H7.66663C7.29844 2.33329 6.99996 2.63177 6.99996 2.99996V8.33329C6.99996 8.70148 7.29844 8.99996 7.66663 8.99996H11.6666Z" fill="currentColor"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_11_448">
                          <rect width="16" height="16" fill="none" />
                        </clipPath>
                      </defs>
                    </svg>
                    <TimerCounter :timeInSeconds="timeLeft" :fontSize="16" :fontWeight="600" />
                </Badge>
                 <Popover v-if="showAnswer">
                   <PopoverTrigger as-child>
                     <Badge variant="secondary" class="text-muted-foreground px-3 text-base font-semibold rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors">
                       <span>Объяснение</span>
                       <svg class="!size-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g clip-path="url(#clip0_74_750)">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666504 7.99996C0.666504 3.94987 3.94975 0.666626 7.99984 0.666626C12.0499 0.666626 15.3332 3.94987 15.3332 7.99996C15.3332 12.05 12.0499 15.3333 7.99984 15.3333C3.94975 15.3333 0.666504 12.05 0.666504 7.99996ZM6.83317 7.33329C6.83317 6.9651 7.13165 6.66663 7.49984 6.66663H8.49984C8.86803 6.66663 9.1665 6.9651 9.1665 7.33329V12C9.1665 12.3681 8.86803 12.6666 8.49984 12.6666H7.49984C7.13165 12.6666 6.83317 12.3681 6.83317 12V7.33329ZM9.33317 4.66663C9.33317 3.93025 8.73622 3.33329 7.99984 3.33329C7.26346 3.33329 6.6665 3.93025 6.6665 4.66663C6.6665 5.40301 7.26346 5.99996 7.99984 5.99996C8.73622 5.99996 9.33317 5.40301 9.33317 4.66663Z" fill="currentColor"/>
                         </g>
                         <defs>
                           <clipPath id="clip0_74_750">
                             <rect width="16" height="16" fill="none"/>
                           </clipPath>
                         </defs>
                       </svg>
                     </Badge>
                   </PopoverTrigger>
                  <PopoverContent class="relative bg-foreground text-background border-none shadow-none px-3 pt-2 pb-3 flex flex-col gap-3 rounded-[12px]" :side-offset="12" align="end" side="bottom">
                    <svg class="text-foreground absolute -top-2 right-3" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8H0C0 8 3.84867 0 8 0C12.1513 0 16 8 16 8Z" fill="currentColor"/>
                    </svg>
                    <span>Кешбэк — это возврат части суммы покупки от банка</span>
                    <Button variant="secondary" class="h-auto justify-start text-start gap-4">
                      <svg class="text-blue-600 flex-shrink-0 size-6" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.625 3.70825C1.62499 2.55765 2.55773 1.62489 3.70833 1.62489L10.0176 1.62488C10.6807 1.62488 11.3166 1.88827 11.7854 2.35711L18.3683 8.94002C19.6701 10.2418 19.6701 12.3523 18.3683 13.6541L13.6543 18.3681C12.3525 19.6699 10.242 19.6699 8.94021 18.3681L2.3573 11.7852C1.88846 11.3164 1.62507 10.6805 1.62506 10.0175L1.625 3.70825ZM7.08358 8.33335C7.77393 8.33335 8.33358 7.77371 8.33358 7.08335C8.33358 6.393 7.77393 5.83335 7.08358 5.83335C6.39322 5.83335 5.83358 6.393 5.83358 7.08335C5.83358 7.77371 6.39322 8.33335 7.08358 8.33335Z" fill="currentColor"/>
                      </svg>
                      <div class="flex flex-col">
                        <span class="text-base font-semibold">Категории кэшбека</span>
                        <span class="text-muted-foreground text-sm">Доступные вам в этом месяце</span>
                      </div>
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
              <div class="flex flex-col gap-4">
                <img :src="currentQuestion.character.avatarUrl" :alt="currentQuestion.character.name" class="h-24 m-auto">
                <h2 class="text-xl text-center font-bold mt-2">{{ currentQuestion.character.name }}</h2>
                <div class="text-center text-lg font-medium text-stone-400 leading-6">
                  {{ currentQuestion.question.question }}
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <button 
              v-for="(option, index) in currentQuestion.question.options.entries"
              :key="index"
              :class="getAnswerClass(index)"
              @click="handleSelectAnswer(index)"
              :disabled="showAnswer"
            >
              <!-- Иконка для правильного/неправильного ответа -->
              <svg 
                v-if="showAnswerIcon(index) && getAnswerIcon(index) === 'cross'"
                class="w-5 absolute -right-1 -top-1" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.75736 7.05025C8.14788 6.65973 8.78105 6.65973 9.17157 7.05025L12 9.87868L14.8284 7.05025C15.219 6.65973 15.8521 6.65973 16.2426 7.05025L16.9497 7.75736C17.3403 8.14788 17.3403 8.78105 16.9497 9.17157L14.1213 12L16.9497 14.8284C17.3403 15.219 17.3403 15.8521 16.9497 16.2426L16.2426 16.9497C15.8521 17.3403 15.219 17.3403 14.8284 16.9497L12 14.1213L9.17157 16.9497C8.78105 17.3403 8.14788 17.3403 7.75736 16.9497L7.05025 16.2426C6.65973 15.8521 6.65973 15.219 7.05025 14.8284L9.87868 12L7.05025 9.17157C6.65973 8.78105 6.65973 8.14788 7.05025 7.75736L7.75736 7.05025Z" fill="currentColor"/>
              </svg>
              
              <svg 
                v-if="showAnswerIcon(index) && getAnswerIcon(index) === 'check'"
                class="w-5 absolute -right-1 -top-1" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM18.4158 9.70405C18.8055 9.31268 18.8041 8.67952 18.4127 8.28984L17.7041 7.58426C17.3127 7.19458 16.6796 7.19594 16.2899 7.58731L10.5183 13.3838L7.19723 10.1089C6.80398 9.72117 6.17083 9.7256 5.78305 10.1189L5.08092 10.8309C4.69314 11.2241 4.69758 11.8573 5.09083 12.2451L9.82912 16.9174C10.221 17.3039 10.8515 17.301 11.2399 16.911L18.4158 9.70405Z" fill="currentColor"/>
              </svg>
              
              {{ option }}
            </button>
          </div>
        </div>
         <Button 
           size="lg" 
           class="text-base" 
           @click="next"
           :disabled="!showAnswer"
         >
           {{ currentQuestionIndex < session.items.length - 1 ? 'Далее' : 'Завершить' }}
         </Button>
      </section>
    </main>
    <section class="mx-auto max-w-screen-md w-full left-0 right-0 grid place-items-center min-h-dvh bg-stone-100 overflow-hidden fixed">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-5 justify-center">
          <p class="inline-flex items-center gap-2 font-semibold text-5xl self-center">
            <span>+3</span>
            <img :src="CoinMiscellaneousSrc" alt="coin" class="w-12">
          </p>
          <p class="text-center text-3xl font-semibold">Отличный результат!</p>
        </div>
        <ul class="flex flex-col">
          <li class="flex items-center gap-4 bg-background py-2 pl-2 pr-5 rounded-t-2xl">
            <div class="bg-blue-200 rounded-lg p-3">
              <svg class="text-blue-600 size-5" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1348 2.22815C10.5773 1.59835 11.2987 1.22351 12.0684 1.22351C13.5038 1.22351 14.6077 2.49257 14.4088 3.91407L14.1014 6.11159L14.1016 6.11176H14.1093H14.117H14.1247H14.1325H14.1402H14.148H14.1557H14.1635H14.1713H14.1791H14.1869H14.1948H14.2026H14.2104H14.2183H14.2262H14.234H14.2419H14.2498H14.2577H14.2657H14.2736H14.2815H14.2895H14.2974H14.3054H14.3134H14.3214H14.3294H14.3374H14.3454H14.3534H14.3615H14.3695H14.3776H14.3856H14.3937H14.4018H14.4099H14.418H14.4261H14.4342H14.4423H14.4504H14.4586H14.4667H14.4749H14.483H14.4912H14.4994H14.5076H14.5158H14.524H14.5322H14.5404H14.5486H14.5568H14.5651H14.5733H14.5816H14.5898H14.5981H14.6064H14.6147H14.623H14.6313H14.6396H14.6479H14.6562H14.6645H14.6728H14.6812H14.6895H14.6978H14.7062H14.7145H14.7229H14.7313H14.7396H14.748H14.7564H14.7648H14.7732H14.7816H14.79H14.7984H14.8068H14.8152H14.8236H14.8321H14.8405H14.8489H14.8574H14.8658H14.8742H14.8827H14.8912H14.8996H14.9081H14.9165H14.925H14.9335H14.942H14.9505H14.9589H14.9674H14.9759H14.9844H14.9929H15.0014H15.0099H15.0184H15.0269H15.0355H15.044H15.0525H15.061H15.0695H15.078H15.0866H15.0951H15.1036H15.1122H15.1207H15.1292H15.1378H15.1463H15.1549H15.1634H15.1719H15.1805H15.189H15.1976H15.2061H15.2147H15.2232H15.2318H15.2403H15.2489H15.2574H15.266H15.2746H15.2831H15.2916H15.3002H15.3088H15.3173H15.3259H15.3344H15.343H15.3515H15.3601H15.3686H15.3772H15.3857H15.3943H15.4028H15.4114H15.4199H15.4285H15.437H15.4456H15.4541H15.4627H15.4712H15.4797H15.4883H15.4968H15.5053H15.5139H15.5224H15.5309H15.5395H15.548H15.5565H15.565H15.5735H15.582H15.5906H15.5991H15.6076H15.6161H15.6246H15.6331H15.6416H15.6501H15.6585H15.667H15.6755H15.684H15.6925H15.7009H15.7094H15.7179H15.7264H15.7347H15.7432H15.7517H15.7602H15.7685H15.777H15.7855H15.7938H15.8023H15.8106H15.8191H15.8274H15.8359H15.8442H15.8527H15.8611H15.8694H15.8779H15.8862H15.8945H15.9029H15.9112H15.9197H15.928H15.9363H15.9447H15.953H15.9613H15.9695H15.9778H15.9861H15.9945H16.0028H16.011H16.0193H16.0276H16.0358H16.0441H16.0523H16.0605H16.0688H16.077H16.0851H16.0935H16.1016H16.1098H16.118H16.1262H16.1343H16.1425H16.1507H16.1588H16.1669H16.175H16.1832H16.1912H16.1994H16.2074H16.2156H16.2236H16.2318H16.2398H16.2478H16.2558H16.2638H16.2718H16.2798H16.2879H16.2959H16.3039H16.3119H16.3199H16.3278H16.3358H16.3436H16.3517H16.3595H16.3674H16.3754H16.3832H16.3911H16.399H16.4068H16.4147H16.4225H16.4302H16.4381H16.4459H16.4536H16.4615H16.4692H16.4769H16.4848H16.4925H16.5002H16.5079H16.5156H16.5233H16.531H16.5387H16.5462H16.5539H16.5614H16.5691H16.5767H16.5842H16.5919H16.5995H16.607H16.6146H16.6221H16.6295H16.637H16.6446H16.652H16.6595H16.6669H16.6743H16.6817H16.6892H16.6966H16.704H16.7112H16.7186H16.726H16.7332H16.7406H16.7478H16.7552H16.7624H16.7697H16.7769H16.7841H16.7913H16.7984H16.8056H16.8129H16.8199H16.827H16.8342H16.8413H16.8484H16.8555H16.8625H16.8696H16.8765H16.8836H16.8905H16.8976H16.9045H16.9114H16.9183H16.9252H16.9321H16.9391H16.9458H16.9527H16.9595H16.9664H16.9732H16.9799H16.9867H16.9934H17.0002H17.0068H17.0135H17.0201H17.0269H17.0335H17.0401H17.0467H17.0533H17.0599H17.0665H17.0729H17.0795H17.086H17.0924H17.0989H17.1053H17.1118C18.0023 6.11176 19.1966 6.53352 20.1666 7.30957C21.1616 8.10554 22 9.34042 22 11C22 12.5497 21.2498 14.9312 20.1636 16.9005C19.6143 17.8966 18.9517 18.8385 18.2059 19.542C17.4699 20.2366 16.568 20.7765 15.5553 20.7765C11.7364 20.7765 8.46187 19.8969 6.79863 19.4242C6.76267 19.414 6.72655 19.4091 6.68918 19.4091C6.46635 19.4091 6.28571 19.2284 6.28571 19.0055V8.20344C6.28571 7.88011 6.38545 7.56463 6.57134 7.30006L10.1348 2.22815ZM2.16071 7.11636C0.967384 7.11636 0 8.08375 0 9.27708V18.3129C0 19.5062 0.967384 20.4736 2.16071 20.4736C3.35404 20.4736 4.32143 19.5062 4.32143 18.3129V9.27708C4.32143 8.08375 3.35404 7.11636 2.16071 7.11636Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="flex flex-grow justify-between">
              <div class="flex flex-col w-full">
                <span class="font-semibold">Правильных ответов</span>
                <span class="text-muted-foreground text-base/4">в штуках</span>
                <Separator />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
  
  <!-- Загрузка -->
  <div v-else class="flex min-h-dvh items-center justify-center bg-stone-100">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-lg font-medium text-stone-600">Подготовка квиза...</p>
    </div>
  </div>
</template>