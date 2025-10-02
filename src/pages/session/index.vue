<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import CoinMiscellaneousSrc from '@/assets/images/miscellaneous/coin.png';
import TimerCounter from "@/components/ui/time-counter/TimerCounter.vue";
import Counter from "@/components/ui/counter/Counter.vue";
import CountUp from "@/components/ui/count-up/CountUp.vue";
import { useQuizSession } from '@/composables/useQuizSession'
import { computed, onMounted, ref, watch } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { vConfetti } from '@neoconfetti/vue';
import { Icon } from '@/components/ui/icon';
import { Motion } from 'motion-v';
import { updateGameStatistics } from '@/lib/storage/profile';

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

const windowHeight = ref<number | null>(null)

onMounted(() => {
  windowHeight.value = window.innerHeight
})

// Состояние для анимации переворота карточки
const isFlipped = ref(false)

// Состояние для показа экрана результатов
const showResults = ref(false)

// Состояние для свайпа карточки
const cardX = ref(0)
const cardY = ref(0)
const cardOpacity = ref(1)
const cardRotate = ref(0)
const cardKey = ref(0)

// Счетчики для статистики
const correctAnswers = ref(0)
const incorrectAnswers = ref(0)
const answerTimes = ref<number[]>([]) // Массив времени ответов в секундах
const questionStartTime = ref<number>(0) // Время начала текущего вопроса

// Для анимации счёта
const previousScore = ref(0)
const animatedScore = ref(0)

// Обработчик выбора ответа с анимацией
const handleSelectAnswer = (index: number) => {
  selectAnswer(index)
  
  // Вычисляем время ответа (затраченное время = начальное время - оставшееся время)
  const timeSpent = totalTime.value - timeLeft.value
  answerTimes.value.push(timeSpent)
  
  // Подсчитываем правильные/неправильные ответы
  if (currentQuestion.value) {
    const isCorrect = currentQuestion.value.question.options.correctEntryIndex === index
    if (isCorrect) {
      correctAnswers.value++
    } else {
      incorrectAnswers.value++
    }
  }
  
  // Запускаем анимацию переворота после выбора ответа
  setTimeout(() => {
    isFlipped.value = true
  }, 50)
}

// Переопределяем функцию next для показа результатов
const handleNext = () => {
  if (!session.value) return
  
  if (currentQuestionIndex.value < session.value.items.length - 1) {
    // Переходим к следующему вопросу
    next()
    // Увеличиваем ключ для анимации новой карточки
    cardKey.value++
  } else {
    // Вычисляем среднее время ответа в секундах
    const avgTime = answerTimes.value.length > 0
      ? answerTimes.value.reduce((acc, time) => acc + time, 0) / answerTimes.value.length
      : 0
    
    // Сохраняем статистику игры
    updateGameStatistics(
      userScore.value,
      session.value.totalReward,
      correctAnswers.value,
      session.value.items.length,
      avgTime
    )
    
    // Показываем экран результатов с анимацией
    showResults.value = true
  }
}

// Обработка драга карточки с помощью pointer events
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)

const handlePointerDown = (event: PointerEvent) => {
  if (!showAnswer.value) return
  
  isDragging.value = true
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
}

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging.value || !showAnswer.value) return
  
  const x = event.clientX - dragStartX.value
  const y = event.clientY - dragStartY.value
  
  // Применяем ограничения: влево и вправо до 500px
  const constrainedX = Math.max(-500, Math.min(x, 500))
  const constrainedY = Math.max(-50, Math.min(y, 0))
  
  cardX.value = constrainedX
  cardY.value = constrainedY
  
  // Вычисляем rotation на основе смещения по X (в обе стороны)
  const maxRotation = 15
  const rotationFactor = Math.min(Math.abs(constrainedX) / 200, 1)
  cardRotate.value = constrainedX > 0 ? rotationFactor * maxRotation : -rotationFactor * maxRotation
}

const handlePointerUp = () => {
  if (!isDragging.value || !showAnswer.value) return
  
  isDragging.value = false
  
  // Используем реальное смещение карточки, а не смещение пальца/курсора
  const x = cardX.value
  const y = cardY.value
  
  const swipeThreshold = 70
  // Разрешаем свайп в обе стороны (влево и вправо)
  const isValidDirection = Math.abs(x) > 0 && y >= -50 && y <= 20
  const swipeDistance = Math.sqrt(x * x + y * y)
  const isValidSwipe = isValidDirection && swipeDistance > swipeThreshold
  
  if (isValidSwipe) {
    // Анимируем исчезновение карточки в нужном направлении
    const direction = x > 0 ? 1 : -1
    cardX.value = direction * window.innerWidth
    cardY.value = -50
    cardOpacity.value = 0
    cardRotate.value = direction * 30
    
    // Проверяем, это последний вопрос или нет
    const isLastQuestion = session.value && currentQuestionIndex.value >= session.value.items.length - 1
    
    setTimeout(() => {
      handleNext()
      
      // Если это НЕ последний вопрос, сбрасываем позицию для новой карточки
      if (!isLastQuestion) {
        cardX.value = 0
        cardY.value = 0
        cardOpacity.value = 1
        cardRotate.value = 0
      }
    }, 300)
  } else {
    // Возвращаем карточку на место
    cardX.value = 0
    cardY.value = 0
    cardRotate.value = 0
  }
}

// Сбрасываем переворот при переходе к следующему вопросу
watch(currentQuestionIndex, () => {
  isFlipped.value = false
  questionStartTime.value = Date.now() // Сохраняем время начала нового вопроса
})

// Вычисляем среднее время ответа
const averageAnswerTime = computed(() => {
  if (answerTimes.value.length === 0) return '0.0'
  const sum = answerTimes.value.reduce((acc, time) => acc + time, 0)
  return (sum / answerTimes.value.length).toFixed(1)
})

// Инициализация времени начала первого вопроса
watch(session, (newSession) => {
  if (newSession && questionStartTime.value === 0) {
    questionStartTime.value = Date.now()
  }
}, { immediate: true })

// Отслеживание изменений счёта для анимации
watch(userScore, (newScore, oldScore) => {
  previousScore.value = oldScore ?? 0
  animatedScore.value = newScore
}, { immediate: true })

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
          <Icon name="arrow-left" />
        </RouterLink>

        <h1 class="font-semibold text-xl text-center">Сессия</h1>
      </header>

      <div class="pt-2 flex flex-col px-4">
        <div class="m-auto flex gap-2">
          <Badge class="px-5 py-1 text-xl font-semibold rounded-xl">
            <div class="relative h-6 w-6 overflow-hidden">
              <Motion
                :key="currentQuestion.character.avatarUrl"
                tag="div"
                class="absolute left-0 top-0"
                :initial="{ y: 24, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :exit="{ y: -24, opacity: 0 }"
                :transition="{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20, 
                  mass: 0.8 
                }"
              >
                <img 
                  :src="currentQuestion.character.avatarUrl" 
                  :alt="currentQuestion.character.name" 
                  class="h-6 object-contain"
                />
              </Motion>
            </div>
            <div class="flex items-center overflow-hidden">
              <Counter 
                :value="currentQuestionIndex + 1" 
                :fontSize="20"
                :places="[1]"
                :gap="0"
                :padding="0"
                :horizontalPadding="0"
                textColor="currentColor"
                :fontWeight="600"
                :gradientHeight="0"
              />
              <span>/{{ session.items.length }}</span>
            </div>
          </Badge>
          <Badge class="px-5 text-xl font-semibold rounded-xl">
            <img :src="CoinMiscellaneousSrc" alt="coin" class="w-6">
            <CountUp 
              :key="animatedScore"
              :from="previousScore"
              :to="animatedScore" 
              direction="up"
            />
          </Badge>
        </div>
      </div>

      <section class="px-4 pt-12 pb-4 flex flex-col gap-4 flex-grow justify-between relative">
        <!-- Невидимый overlay для перехвата событий свайпа -->
        <div
          v-if="showAnswer"
          class="fixed inset-0 z-40 touch-none"
          @pointerdown="handlePointerDown"
          @pointermove="handlePointerMove"
          @pointerup="handlePointerUp"
          @pointercancel="handlePointerUp"
        ></div>
        
        <div>
          <div class="relative">
            <Motion
              :key="cardKey"
              tag="div"
              class="flex flex-col gap-8 p-6 h-full bg-white rounded-2xl touch-none"
              :initial="{ scale: 0.8, opacity: 0 }"
              :animate="{ 
                scale: 1, 
                opacity: cardOpacity,
                x: cardX,
                y: cardY,
                rotate: cardRotate
              }"
              :transition="{ 
                type: 'spring', 
                stiffness: 250, 
                damping: 25,
                mass: 0.7
              }"
            >
              <div class="flex items-center justify-between relative gap-8">
                <Badge
                :class="`${timerColors.badgeClass} px-3 text-base font-semibold rounded-lg transition-colors`"
              >
                  <Icon name="clock" class="!size-4" />
                    <TimerCounter :timeInSeconds="timeLeft" :fontSize="16" :fontWeight="600" />
                </Badge>
                 <Popover v-if="showAnswer">
                   <PopoverTrigger as-child>
                     <Motion
                       tag="div"
                       class="absolute right-0 z-50"
                       :initial="{ scale: 0, opacity: 0 }"
                       :animate="{ scale: 1, opacity: 1 }"
                       :transition="{ 
                         type: 'spring', 
                         stiffness: 150, 
                         damping: 10, 
                         mass: 0.3
                       }"
                     >
                       <Badge variant="secondary" class="glare text-muted-foreground px-3 text-base font-semibold rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors">
                         <span>Объяснение</span>
                         <Icon name="info" class="!size-4" />
                       </Badge>
                     </Motion>
                   </PopoverTrigger>
                  <PopoverContent class="relative bg-foreground text-background border-none shadow-none px-3 pt-2 pb-3 flex flex-col gap-3 rounded-[12px]" :side-offset="12" align="end" side="bottom">
                    <Icon name="arrow-up" class="text-foreground absolute -top-2 right-3" />
                    <p v-for="(paragraph, index) in currentQuestion.question.options.explanation.paragraphs" :key="index">
                      {{ paragraph }}
                    </p>
                    <a v-for="(link, index) in currentQuestion.question.options.explanation.links" :key="index" :href="link.url" target="_blank" class="text-blue-600">
                      {{ link.content }}
                    </a>
                    <Button v-for="(button, index) in currentQuestion.question.options.explanation.buttons" :key="index" variant="secondary" class="h-auto justify-start text-start gap-4" asChild>
                      <a :href="button.url" target="_blank">
                        <Icon :name="button.icon as any" class="text-blue-600 flex-shrink-0 size-6" />
                        <div class="flex flex-col">
                          <span class="text-base font-semibold">{{ button.title }}</span>
                          <span class="text-muted-foreground text-sm">{{ button.description }}</span>
                        </div>
                      </a>
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
            </Motion>
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
              <Icon 
                v-if="showAnswerIcon(index) && getAnswerIcon(index) === 'cross'"
                name="cross-circle"
                class="w-5 absolute -right-1 -top-1"
              />
              
              <Icon 
                v-if="showAnswerIcon(index) && getAnswerIcon(index) === 'check'"
                name="check-circle"
                class="w-5 absolute -right-1 -top-1"
              />
              
              {{ option }}
            </button>
          </div>
        </div>
        
        <!-- Подсказка для свайпа -->
        <Motion
          v-if="showAnswer"
          tag="div"
          class="grid place-items-center flex-grow relative z-20 animate-pulse"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ 
            type: 'spring', 
            stiffness: 150, 
            damping: 10, 
            mass: 0.3
          }"
        >
          <div class="flex items-center justify-center flex-col gap-2 text-muted-foreground text-sm">
            <Icon name="finger-touch" class="size-6" />
            <span>Смахни вправо/влево к следующему вопросу</span>
          </div>
        </Motion>
      </section>
    </main>
    <!-- Экран результатов с анимацией -->
    <Transition
      enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-500 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <section v-if="showResults" class="mx-auto max-w-screen-md w-full left-0 right-0 flex flex-col justify-between min-h-dvh p-4 bg-stone-100 overflow-hidden fixed z-50">
      <div v-if="windowHeight" v-confetti="{ stageHeight: windowHeight }" class="!fixed top-0 mx-auto left-0 right-0"></div>
      <div class="grid place-items-center flex-grow">
        <div class="flex flex-col gap-8 w-full">
          <div class="flex flex-col gap-5 justify-center">
            <p class="inline-flex items-center gap-2 font-semibold text-5xl self-center">
              <span>+{{ userScore }}</span>
              <img :src="CoinMiscellaneousSrc" alt="coin" class="w-12">
            </p>
            <p class="text-center text-3xl font-semibold">
              {{ correctAnswers >= 4 ? 'Отличный результат!' : correctAnswers >= 2 ? 'Хороший результат!' : 'Попробуйте еще раз!' }}
            </p>
          </div>
          <ul class="flex flex-col w-full">
            <li class="flex items-start gap-4 bg-background py-2 pl-2 pr-5 rounded-t-2xl">
              <div class="bg-blue-200 rounded-lg p-3">
                <Icon name="thumbs-up" class="text-blue-600 size-5" />
              </div>
              <div class="flex flex-grow flex-col gap-3">
                <div class="flex justify-between gap-4 items-center w-full">
                  <div class="flex flex-col w-full">
                    <span class="font-semibold">Правильных ответов</span>
                    <span class="text-muted-foreground text-base/4">в штуках</span>
                  </div>
                  <span class="mt-3 text-xl font-semibold">{{ correctAnswers }}</span>
                </div>
                <Separator class="!w-[calc(100%+4px)] -ml-1" />
              </div>
            </li>
            <li class="flex items-start gap-4 bg-background pb-2 pl-2 pr-5">
              <div class="bg-blue-200 rounded-lg p-3">
                <Icon name="thumbs-down" class="text-blue-600 size-5" />
              </div>
              <div class="flex flex-grow flex-col gap-3">
                <div class="flex justify-between gap-4 items-center w-full">
                  <div class="flex flex-col w-full">
                    <span class="font-semibold">Неправильных ответов</span>
                    <span class="text-muted-foreground text-base/4">в штуках</span>
                  </div>
                  <span class="mt-3 text-xl font-semibold">{{ incorrectAnswers }}</span>
                </div>
                <Separator class="!w-[calc(100%+4px)] -ml-1" />
              </div>
            </li>
            <li class="flex items-start gap-4 bg-background pb-2 pl-2 pr-5 rounded-b-2xl">
              <div class="bg-blue-200 rounded-lg p-3">
                <Icon name="stopwatch" class="text-blue-600 size-5" />
              </div>
              <div class="flex flex-grow flex-col gap-3">
                <div class="flex justify-between gap-4 items-center w-full">
                  <div class="flex flex-col w-full">
                    <span class="font-semibold">Среднее время ответа</span>
                    <span class="text-muted-foreground text-base/4 pb-1">в секундах</span>
                  </div>
                  <span class="mt-3 text-xl font-semibold">{{ averageAnswerTime }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Button size="lg" asChild>
        <RouterLink :to="{ name: 'start-screen' }">
          На главный экран
        </RouterLink>
      </Button>
      </section>
    </Transition>
  </div>
  
  <!-- Загрузка -->
  <div v-else class="flex min-h-dvh items-center justify-center bg-stone-100">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-lg font-medium text-stone-600">Подготовка квиза...</p>
    </div>
  </div>
</template>