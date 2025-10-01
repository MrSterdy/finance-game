<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter();

//Логика со стартом сессии
const startSession = () => {
  router.push('/session')
}

import TrophyMiscellaneousSrc from '@/assets/images/miscellaneous/trophy.png';
import GiftMiscellaneousSrc from '@/assets/images/miscellaneous/gift.png';
import CoinMiscellaneousSrc from '@/assets/images/miscellaneous/coin.png';
import DogCharactersSrc from '@/assets/images/characters/dog.png';
import FoxCharactersSrc from '@/assets/images/characters/fox.png';
import MonkeyCharactersSrc from '@/assets/images/characters/monkey.png';
import SheepCharactersSrc from '@/assets/images/characters/sheep.png';
import WolfCharactersSrc from '@/assets/images/characters/wolf.png';
</script>

<template>
  <div
      class="flex min-h-dvh transition-colors duration-500 ease-in-out bg-stone-100"
  >
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
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

        <h1 class="font-semibold text-xl text-center">Игра</h1>
      </header>

      <section class="px-4 py-2 relative overflow-hidden">
        <router-link to="/statistics">
          <div class="bg-white rounded-xl px-4 py-2 relative overflow-hidden">
            <div class="font-semibold">Статистика</div>
            <div class="text-muted-foreground">Ваш прогресс в игре</div>
            <img :src="TrophyMiscellaneousSrc" alt="trophy" class="absolute right-0 bottom-0 w-20">
          </div>
        </router-link>
      </section>

      <section class="px-4 py-2">
        <div class="bg-white rounded-xl px-4 py-6 overflow-hidden flex flex-col gap-12">
          <div class="bg-orange-100 flex gap-2 w-fit rounded-lg items-center text-orange-500 px-2 m-auto font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M5.5055 0.732882C5.56762 0.754376 5.65672 0.786031 5.76894 0.828068C5.99326 0.912098 6.31068 1.03787 6.69027 1.20721C7.44756 1.54504 8.46194 2.06051 9.48089 2.77006C11.4966 4.1737 13.6666 6.43797 13.6666 9.69292C13.6666 11.1159 13.2869 12.5246 12.403 13.5904C11.5034 14.6751 10.1396 15.3334 8.33325 15.3334C8.29002 15.3334 8.11672 15.3319 7.9445 15.2084C7.70429 15.0361 7.64653 14.7694 7.67225 14.5778C7.69163 14.4335 7.75359 14.335 7.77163 14.3068C7.79763 14.2662 7.82257 14.2371 7.83549 14.2226C7.86193 14.1929 7.88532 14.1721 7.89373 14.1647C7.90491 14.1548 7.91434 14.1472 7.91999 14.1427C7.9376 14.1286 7.95479 14.1164 7.96007 14.1126L7.96077 14.1121L8.01227 14.0758C8.05071 14.0485 8.10573 14.0087 8.17243 13.9565C8.30695 13.8512 8.48635 13.6974 8.66449 13.5017C9.02978 13.1006 9.33325 12.5879 9.33325 12C9.33325 10.9121 8.71389 9.901 8.00439 9.11267C7.65787 8.72764 7.30951 8.41779 7.04755 8.20435C7.03132 8.19112 7.01543 8.17827 6.99992 8.16582C6.98441 8.17827 6.96852 8.19112 6.95228 8.20435C6.69033 8.41779 6.34197 8.72764 5.99545 9.11267C5.28595 9.901 4.66658 10.9121 4.66658 12C4.66658 12.5925 4.96929 13.1054 5.33208 13.5043C5.50929 13.6991 5.68785 13.8519 5.82174 13.956C5.88812 14.0077 5.9427 14.0466 5.97989 14.0725C5.99548 14.0834 6.00759 14.0916 6.01865 14.0991L6.02668 14.1046C6.03135 14.1078 6.04224 14.1152 6.05236 14.1225C6.0554 14.1247 6.07584 14.1393 6.09832 14.1584C6.10548 14.1645 6.11806 14.1755 6.13291 14.19C6.1435 14.2004 6.17636 14.2328 6.21041 14.2808C6.22815 14.3071 6.26727 14.3772 6.28675 14.4217C6.31111 14.4958 6.33268 14.6967 6.31545 14.8201C6.25993 14.9708 6.06839 15.1987 5.94933 15.2705C5.86517 15.3031 5.72218 15.331 5.66658 15.3334C3.86022 15.3334 2.49644 14.6751 1.59687 13.5904C0.712936 12.5246 0.333252 11.1159 0.333252 9.69292C0.333252 7.99284 0.922299 6.92103 1.70183 6.1034C2.06425 5.72326 2.46469 5.40151 2.82378 5.11299L2.85227 5.09009C3.2306 4.78604 3.56174 4.51729 3.84511 4.21264C4.53873 3.46694 4.69622 2.79147 4.70695 2.33204C4.71249 2.09498 4.67896 1.9028 4.64621 1.77478C4.62989 1.71098 4.614 1.66407 4.60386 1.6367C4.59881 1.62306 4.59524 1.61441 4.59384 1.6111C4.48475 1.3725 4.52548 1.09116 4.69886 0.893601C4.91312 0.64947 5.21914 0.633803 5.5055 0.732882Z" fill="url(#paint0_linear_396_36)"/>
              <defs>
                <linearGradient id="paint0_linear_396_36" x1="6.99992" y1="15.3334" x2="6.99992" y2="0.675781" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FA721A"/>
                  <stop offset="1" stop-color="#FFB05C"/>
                </linearGradient>
              </defs>
            </svg>

            3 дня
          </div>

          <div class="flex flex-col gap-4">
            <div class="font-semibold text-center text-xl">
              День 4
            </div>

            <div class="text-muted-foreground text-center leading-5">
              Темы: ипотека, страхование, <br/>
              дивиденды, устройство банка
            </div>

            <div class="relative flex m-auto">
              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center z-10">
                <img :src="WolfCharactersSrc" alt="wolf" class="w-9 object-contain">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-20">
                <img :src="MonkeyCharactersSrc" alt="monkey" class="w-9 object-contain">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-30">
                <img :src="SheepCharactersSrc" alt="sheep" class="w-9 object-contain">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-40">
                <img :src="FoxCharactersSrc" alt="fox" class="w-9 object-contain">
              </div>

              <div class="relative p-3 bg-gray-100 rounded-full flex items-center justify-center -ml-5 z-50">
                <img :src="DogCharactersSrc" alt="dog" class="w-9 object-contain">
              </div>
            </div>
          </div>

          <Button class="w-full py-6" @click="startSession"> Начать день </Button>
        </div>
      </section>

      <section class="px-4 py-2 flex gap-2">
        <div class="bg-white rounded-xl p-4 relative overflow-hidden w-full">
          <div class="font-semibold flex items-center gap-2">Обменять <img :src="CoinMiscellaneousSrc" alt="coin" class="w-5"> на призы</div>
          <div class="text-muted-foreground">от Газпромбанка</div>
          <img :src="GiftMiscellaneousSrc" alt="trophy" class="absolute -right-3 -bottom-7 w-20">
        </div>

        <div class="bg-primary rounded-xl p-4 items-center">
          <div class="text-white font-semibold text-xl flex gap-2 w-fit m-auto">
            3 <img :src="CoinMiscellaneousSrc" alt="coin" class="w-6 object-contain">
          </div>
          <div class="text-muted-foreground">
            Баланс
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>

</style>