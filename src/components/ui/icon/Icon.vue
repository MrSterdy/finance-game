<script setup lang="ts">
import type { SVGAttributes } from "vue"
import type { IconName } from "./icons"
import { icons } from "./icons"
import { cn } from "@/lib/utils"

interface Props extends /* @vue-ignore */ SVGAttributes {
  name: IconName
  class?: string
}

const props = defineProps<Props>()

const iconDef = icons[props.name]
</script>

<template>
  <svg
    v-bind="$attrs"
    :class="cn('inline-block', props.class)"
    :width="iconDef.width"
    :height="iconDef.height"
    :viewBox="iconDef.viewBox"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    v-html="iconDef.content"
  />
</template>

