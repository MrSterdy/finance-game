<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock3 } from 'lucide-vue-next';
import FoxCharacterSrc from '@/assets/images/characters/fox.png';

const emit = defineEmits<{
  next: []
}>();

const handleNext = () => {
  emit('next');
};
</script>

<template>
    <div class="h-full flex flex-col">
        <section class="pt-15 flex flex-col px-4">
            <div class="flex justify-center">
                <div class="rounded-t-3xl w-full max-w-56 relative bg-background/80 text-foreground">
                    <header class="p-4 font-sf-pro-display font-semibold text-xs flex justify-between items-center">
                        <p>9:41</p>
                        <div class="flex items-center gap-1">
                            <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1843 1.59686C12.1843 1.21366 11.8952 0.903015 11.5386 0.903015H10.8929C10.5363 0.903015 10.2472 1.21366 10.2472 1.59686V7.61022C10.2472 7.99342 10.5363 8.30407 10.8929 8.30407H11.5386C11.8952 8.30407 12.1843 7.99342 12.1843 7.61022V1.59686ZM7.68417 2.38323H8.32986C8.68647 2.38323 8.97555 2.70133 8.97555 3.09373V7.59357C8.97555 7.98597 8.68647 8.30407 8.32986 8.30407H7.68417C7.32757 8.30407 7.03848 7.98597 7.03848 7.59357V3.09373C7.03848 2.70133 7.32757 2.38323 7.68417 2.38323ZM5.06201 3.98678H4.41632C4.05971 3.98678 3.77063 4.30894 3.77063 4.70633V7.58452C3.77063 7.98191 4.05971 8.30407 4.41632 8.30407H5.06201C5.41861 8.30407 5.7077 7.98191 5.7077 7.58452V4.70633C5.7077 4.30894 5.41861 3.98678 5.06201 3.98678ZM1.85327 5.467H1.20758C0.850974 5.467 0.56189 5.78455 0.56189 6.17627V7.5948C0.56189 7.98652 0.850974 8.30407 1.20758 8.30407H1.85327C2.20987 8.30407 2.49896 7.98652 2.49896 7.5948V6.17627C2.49896 5.78455 2.20987 5.467 1.85327 5.467Z" fill="currentColor"/>
                            </svg>
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.91225 2.45764C7.41778 2.45771 8.86574 3.01588 9.95686 4.01678C10.039 4.09406 10.1704 4.09308 10.2513 4.0146L11.0367 3.24978C11.0777 3.20997 11.1005 3.15605 11.1002 3.09995C11.0998 3.04384 11.0763 2.99018 11.0349 2.95084C8.17104 0.302681 3.653 0.302681 0.789165 2.95084C0.74768 2.99016 0.724142 3.0438 0.72376 3.0999C0.723377 3.156 0.746181 3.20994 0.787126 3.24978L1.57277 4.0146C1.65364 4.0932 1.78507 4.09417 1.86718 4.01678C2.95844 3.01581 4.40657 2.45764 5.91225 2.45764ZM5.91022 5.01232C6.73185 5.01227 7.52416 5.32204 8.1332 5.88145C8.21557 5.96084 8.34533 5.95912 8.42563 5.87757L9.20487 5.07895C9.2459 5.03706 9.26867 4.98023 9.26808 4.92118C9.26749 4.86213 9.24359 4.80578 9.20172 4.76475C7.34708 3.01482 4.47493 3.01482 2.62029 4.76475C2.5784 4.80578 2.5545 4.86215 2.55395 4.92122C2.5534 4.98029 2.57625 5.03712 2.61737 5.07895L3.39638 5.87757C3.47668 5.95912 3.60644 5.96084 3.68882 5.88145C4.29745 5.32241 5.08913 5.01266 5.91022 5.01232ZM7.43834 6.70335C7.4395 6.76712 7.41707 6.8286 7.37633 6.87328L6.05872 8.35921C6.0201 8.40288 5.96744 8.42746 5.91249 8.42746C5.85755 8.42746 5.80489 8.40288 5.76626 8.35921L4.44843 6.87328C4.40772 6.82857 4.38533 6.76707 4.38654 6.70329C4.38774 6.63952 4.41245 6.57913 4.45481 6.53639C5.29628 5.74104 6.5287 5.74104 7.37017 6.53639C7.41251 6.57917 7.43717 6.63958 7.43834 6.70335Z" fill="currentColor"/>
                            </svg>
                            <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.35" x="0.736505" y="0.881341" width="14.528" height="7.264" rx="2.30027" fill="currentColor" stroke="currentColor" stroke-width="0.605333"/>
                                <path opacity="0.4" d="M16.1725 3.47284V5.93986C16.6596 5.73092 16.9764 5.24486 16.9764 4.70635C16.9764 4.16784 16.6596 3.68178 16.1725 3.47284" fill="currentColor"/>
                                <rect x="1.64453" y="1.78931" width="12.712" height="5.448" rx="1.51333" fill="currentColor"/>
                            </svg>
                        </div>
                    </header>
                    <div class="rounded-2xl bg-background max-w-56 aspect-square p-4 flex flex-col relative left-6 shadow-xl animate-fox-container">
                        <Badge class="rounded-sm">
                            <Clock3 />
                            {{ ' ' }}
                            0:24
                        </Badge>
                        <div class="pt-4 flex flex-col gap-2 items-center text-center">
                            <div class="flex flex-col items-center text-center gap-2">
                                <img :src="FoxCharacterSrc" alt="Лиса" class="w-16">
                                <p class="font-bold">Лиса</p>
                            </div>
                            <p class="text-sm text-muted-foreground">Я заработала 10 000₽. Сколько у меня останется после уплаты налогов для физ. лиц?</p>
                        </div>
                    </div>
                    <div class="pt-2 grid grid-cols-2 gap-1.5 px-2 pb-2">
                        <Button class="shadow-none rounded-xl bg-background text-foreground hover:bg-background/80 text-xs h-12 animate-button-1">
                            4 550₽
                        </Button>
                        <Button class="shadow-none rounded-xl bg-background text-foreground hover:bg-background/80 text-xs h-12 animate-button-2">
                            8 700₽
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        <div class="h-5 shadow-[0_-10px_20px_0_rgba(0,0,0,0.05)]"></div>
        <section class="px-4 pt-3 pb-4 flex flex-col gap-4 flex-grow justify-between">
            <div class="flex flex-col gap-3">
                <h1 class="font-semibold text-3xl">Помогите зверям изучить фин. грамотность</h1>
                <p>Проверьте свои знания в области финансов и постарайтесь помочь всем животным с их финансовыми вопросами в формате увлекательной мини-игры</p>
            </div>
            <Button size="lg" class="text-base" @click="handleNext">Далее</Button>
        </section>
    </div>
</template>

<style scoped>
@keyframes slide-up-fade {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes button-appear {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fox-container {
  animation: slide-up-fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

.animate-button-1 {
  animation: button-appear 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s both;
}

.animate-button-2 {
  animation: button-appear 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.9s both;
}
</style>