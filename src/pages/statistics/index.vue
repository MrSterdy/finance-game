<script setup lang="ts">
import type { DateRange } from "reka-ui"
import type { Ref } from "vue"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ref } from "vue"
import { RangeCalendar } from "@/components/ui/range-calendar"
import { Icon } from '@/components/ui/icon'

const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })

const value = ref({
  start,
  end,
}) as Ref<DateRange>

const activeBlock = ref('month')

</script>

<template>
  <div
      class="flex min-h-dvh transition-colors duration-500 ease-in-out bg-stone-100"
  >
    <main class="mx-auto max-w-screen-md flex-grow flex flex-col overflow-hidden">
      <header class="grid grid-cols-3 gap-1 py-4 p-4 items-center">
        <RouterLink class="text-muted-foreground" :to="{ name: 'start-screen' }">
          <Icon name="arrow-left" />
        </RouterLink>

        <h1 class="font-semibold text-xl text-center">Статистика</h1>
      </header>

      <section class="flex flex-col px-4">
        <div class="m-auto flex gap-2">
          <button
              @click="activeBlock = 'allTime'"
              :class="['py-1 px-3 rounded-lg', activeBlock === 'allTime' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600']"
          >
            Всё время
          </button>

          <button
              @click="activeBlock = 'week'"
              :class="['py-1 px-3 rounded-lg', activeBlock === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600']"
          >
            Неделя
          </button>

          <button
              @click="activeBlock = 'month'"
              :class="['py-1 px-3 rounded-lg', activeBlock === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600']"
          >
            Месяц
          </button>
        </div>
      </section>

<!--      Разные календарики диограмки-->
      <section class="py-4 flex flex-col px-4">
        <RangeCalendar v-model="value" class="bg-white rounded-xl" v-if="activeBlock === 'month'"/>
      </section>

      <section class="px-4">
        <div class="rounded-xl bg-white">
          <div class="flex gap-2 pl-2 py-2 pr-4 items-center">
            <div class="bg-blue-200 p-3 rounded-lg">
              <Icon name="games" class="text-blue-600" />
            </div>
            <div class="flex justify-between pl-2 w-full items-center">
              <div class="leading-5.5">
                <div class="font-semibold">
                  Сыграно игр
                </div>
                <span class="text-muted-foreground">
                в штуках
              </span>
              </div>
              <div class="font-semibold">
                5
              </div>
            </div>
          </div>

          <div class="flex gap-2 pl-2 py-2 pr-4 items-center">
            <div class="bg-blue-200 p-3 rounded-lg">
              <Icon name="messages" class="text-blue-600" />
            </div>
            <div class="flex justify-between pl-2 w-full items-center">
              <div class="leading-5.5">
                <div class="font-semibold">
                  Дано ответов
                </div>
                <span class="text-muted-foreground">
                в штуках
              </span>
              </div>
              <div class="font-semibold">
                24
              </div>
            </div>
          </div>

          <div class="flex gap-2 pl-2 py-2 pr-4 items-center">
            <div class="bg-blue-200 p-3 rounded-lg">
              <Icon name="thumbs-up" class="text-blue-600" />
            </div>
            <div class="flex justify-between pl-2 w-full items-center">
              <div class="leading-5.5">
                <div class="font-semibold">
                  Правильных ответов
                </div>
                <span class="text-muted-foreground">
                в % соотношении
              </span>
              </div>
              <div class="font-semibold">
                82%
              </div>
            </div>
          </div>

          <div class="flex gap-2 pl-2 py-2 pr-4 items-center">
            <div class="bg-blue-200 p-3 rounded-lg">
              <Icon name="stopwatch" class="text-blue-600" />
            </div>
            <div class="flex justify-between pl-2 w-full items-center">
              <div class="leading-5.5">
                <div class="font-semibold">
                  Среднее время ответа
                </div>
                <span class="text-muted-foreground">
                в секундах
              </span>
              </div>
              <div class="font-semibold">
                14с
              </div>
            </div>
          </div>

          <div class="flex gap-2 pl-2 py-2 pr-4 items-center">
            <div class="bg-blue-200 p-3 rounded-lg">
              <Icon name="flame" class="text-blue-600" />
            </div>
            <div class="flex justify-between pl-2 w-full items-center">
              <div class="leading-5.5">
                <div class="font-semibold">
                  Максимальный стрик
                </div>
                <span class="text-muted-foreground">
                в днях
              </span>
              </div>
              <div class="font-semibold">
                5
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>

</style>