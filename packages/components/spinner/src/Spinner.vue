<script setup lang="ts">
import type { SpinnerProps } from './useSpinner'
import { useSpinner } from './useSpinner'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<SpinnerProps>()

const { slots, baseProps } = useSpinner(props)
</script>

<template>
  <div v-bind="baseProps">
    <div :class="slots.wrapper({ class: classNames?.wrapper })">
      <i :class="slots.circle1({ class: classNames?.circle1 })" />
      <i :class="slots.circle2({ class: classNames?.circle2 })" />
    </div>
    <span v-if="label || $slots.default" :class="slots.label({ class: classNames?.label })">
      <slot>
        {{ label }}
      </slot>
    </span>
  </div>
</template>
