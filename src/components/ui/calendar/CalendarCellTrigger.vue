<script lang="ts" setup>
import type { CalendarCellTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { CalendarCellTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes["class"] }>(), {
  as: "button",
})

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    data-slot="calendar-cell-trigger"
    :class="cn(
      'w-[30px] h-[30px] flex items-center justify-center font-semibold text-base cursor-default transition-colors',
      'hover:bg-transparent',
      // Selected dates (range)
      'data-[selected]:bg-blue-600 data-[selected]:text-white data-[selected]:rounded-lg',
      // Disabled
      'data-[disabled]:text-black data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
      // Outside months
      'data-[outside-view]:text-black data-[outside-view]:opacity-50',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>

