<script setup lang="ts">
import { buttonGroup } from '@vue-nextui/theme'
import type { ButtonProps } from './useButton'
import { computed } from 'vue'
import { provideButtonGroupContext } from './context'
import type { PrimitiveProps } from 'radix-vue'

export interface ButtonGroupProps extends
  PrimitiveProps, Partial<
    Pick<
      ButtonProps,
      'size' | 'color' | 'radius' | 'variant' | 'isIconOnly' | 'disableAnimation' | 'disableRipple' | 'fullWidth' | 'isDisabled'
    >
  > {
  class?: string
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  as: 'div',
})

provideButtonGroupContext(computed(() => ({
  color: props.color,
  variant: props.variant,
  radius: props.radius,
  isDisabled: props.isDisabled,
  disableAnimation: props.disableAnimation,
  disableRipple: props.disableRipple,
  isIconOnly: props.isIconOnly,
  fullWidth: props.fullWidth,
})))

const classNames = computed(() => {
  return buttonGroup({
    fullWidth: props.fullWidth,
    class: props.class,
  })
})

console.log(props.as, ':as')
</script>

<template>
  <component
    :is="as"
    role="group"
    :class="classNames"
  >
    <slot />
  </component>
</template>
