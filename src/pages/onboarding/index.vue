<script setup lang="ts">
import { ref, computed } from 'vue';
import { Progress } from '@/components/ui/progress';
import KeepProgressOnboardingContent from '@/components/pages/onboarding/KeepProgressOnboardingContent.vue';
import MakeMoneyOnboardingContent from '@/components/pages/onboarding/MakeMoneyOnboardingContent.vue';
import HelpAnimalsOnboardingContent from '@/components/pages/onboarding/HelpAnimalsOnboardingContent.vue';
import { useRouter } from "vue-router";
import { profile } from '@/lib/storage/profile';

// Текущий шаг онбординга (0, 1 или 2)
const currentStep = ref(0);
// Общее количество шагов в онбординге
const totalSteps = 3;
// Получаем router
const router = useRouter()

// Цвета фона для каждого шага онбординга
const backgroundColors = [
  '#BED7FF', // Step 0 - HelpAnimalsOnboardingContent (голубой)
  '#FDBFCC', // Step 1 - MakeMoneyOnboardingContent (розовый)
  '#FDC5AC'  // Step 2 - KeepProgressOnboardingContent (персиковый)
];

// Вычисляемое значение текущего цвета фона
const currentBackgroundColor = computed(() => backgroundColors[currentStep.value]);

/**
 * Вычисляет значение прогресса для определенного шага
 * @param step - номер шага
 * @returns 100 если шаг завершен, иначе 0
 */
const progressValue = (step: number) => {
  return currentStep.value >= step ? 100 : 0;
};

/**
 * Переход к следующему шагу онбординга
 * Проверяет, что не превышен максимальный шаг
 * Если привышен открывается первый экран игры
 */
const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  } else {
    // Отмечаем онбординг как завершенный
    profile.value.onboardingCompleted = true;
    router.push('/start-screen')
  }
};

// Вычисляемое значение текущего компонента онбординга
const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 0:
      return HelpAnimalsOnboardingContent; // Первый шаг: помощь животным
    case 1:
      return MakeMoneyOnboardingContent;    // Второй шаг: заработок монет
    case 2:
      return KeepProgressOnboardingContent; // Третий шаг: сохранение прогресса
    default:
      return HelpAnimalsOnboardingContent;  // По умолчанию первый шаг
  }
});
</script>

<template>
    <!-- Основной контейнер с плавным переходом цвета фона -->
    <div 
      class="flex min-h-dvh transition-colors duration-500 ease-in-out"
      :style="{ backgroundColor: currentBackgroundColor }"
    >
        <!-- Основная область контента с ограниченной шириной -->
        <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
            <!-- Шапка с индикаторами прогресса для каждого шага -->
            <header class="grid grid-cols-3 gap-1 p-4">
                <Progress 
                  class="bg-background/50 h-1" 
                  indicator-class="duration-[1s]"
                  :model-value="progressValue(0)" 
                />
                <Progress 
                  class="bg-background/50 h-1" 
                  indicator-class="duration-[1s]"
                  :model-value="progressValue(1)" 
                />
                <Progress 
                  class="bg-background/50 h-1" 
                  indicator-class="duration-[1s]"
                  :model-value="progressValue(2)" 
                />
            </header>
            
            <!-- Переход между компонентами с анимацией fade + blur -->
            <Transition
              name="onboarding-fade"
              mode="out-in"
            >
              <component 
                :is="currentComponent" 
                :key="currentStep"
                @next="nextStep"
              />
            </Transition>
        </main>
    </div>
</template>

<style scoped>
/* === Анимации переходов между шагами онбординга === */

/* Активные состояния анимации - задают продолжительность и плавность */
.onboarding-fade-enter-active,
.onboarding-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Начальное состояние появления нового компонента */
.onboarding-fade-enter-from {
  opacity: 0;                 /* Прозрачность */
  transform: translateX(100%); /* Сдвиг справа */
  filter: blur(10px);         /* Размытие */
}

/* Конечное состояние исчезновения старого компонента */
.onboarding-fade-leave-to {
  opacity: 0;                  /* Прозрачность */
  transform: translateX(-100%); /* Сдвиг влево */
  filter: blur(10px);          /* Размытие */
}

/* Видимые состояния компонентов */
.onboarding-fade-enter-to,
.onboarding-fade-leave-from {
  opacity: 1;               /* Полная видимость */
  transform: translateX(0); /* Без сдвига */
  filter: blur(0px);        /* Без размытия */
}
</style>