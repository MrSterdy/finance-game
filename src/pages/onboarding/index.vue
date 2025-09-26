<script setup lang="ts">
import { ref, computed } from 'vue';
import { Progress } from '@/components/ui/progress';
import KeepProgressOnboardingContent from '@/components/pages/onboarding/KeepProgressOnboardingContent.vue';
import MakeMoneyOnboardingContent from '@/components/pages/onboarding/MakeMoneyOnboardingContent.vue';
import HelpAnimalsOnboardingContent from '@/components/pages/onboarding/HelpAnimalsOnboardingContent.vue';

const currentStep = ref(0);
const totalSteps = 3;

const backgroundColors = [
  '#FDC5AC', // Step 0 - HelpAnimalsOnboardingContent
  '#FDBFCC', // Step 1 - MakeMoneyOnboardingContent  
  '#BED7FF'  // Step 2 - KeepProgressOnboardingContent
];

const currentBackgroundColor = computed(() => backgroundColors[currentStep.value]);

const progressValue = (step: number) => {
  return currentStep.value >= step ? 100 : 0;
};

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  }
};

const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 0:
      return HelpAnimalsOnboardingContent;
    case 1:
      return MakeMoneyOnboardingContent;
    case 2:
      return KeepProgressOnboardingContent;
    default:
      return HelpAnimalsOnboardingContent;
  }
});
</script>

<template>
    <div 
      class="flex min-h-dvh transition-colors duration-500 ease-in-out"
      :style="{ backgroundColor: currentBackgroundColor }"
    >
        <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
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
.onboarding-fade-enter-active,
.onboarding-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.onboarding-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
  filter: blur(10px);
}

.onboarding-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  filter: blur(10px);
}

.onboarding-fade-enter-to,
.onboarding-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
  filter: blur(0px);
}
</style>