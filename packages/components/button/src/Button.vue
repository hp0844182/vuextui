<script setup lang="ts">
import { computed, ref } from 'vue'
import { Primitive } from 'radix-vue'
import type { ButtonProps } from './useButton'
import { useButton } from './useButton'
import { button } from '@vue-nextui/theme'
import { Ripple } from '@vue-nextui/ripple'
import { Spinner } from '@vue-nextui/spinner'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  asChild: false,
  size: 'md',
  spinnerPlacement: 'start',
})

const domRef = ref<HTMLElement | null>(null)
const { buttonProps, onClear, ripples, spinnerSize } = useButton(props)

const cls = computed(() => {
  return button({
    color: props.color,
    variant: props.variant,
    disableAnimation: props.disableAnimation,
    isDisabled: props.isDisabled || props.isLoading,
    size: props.size,
    radius: props.radius,
    fullWidth: props.fullWidth,
    isIconOnly: props.isIconOnly,
    isInGroup: props.isInGroup,
    className: props.class,
  })
})
</script>

<template>
  <Primitive
    ref="domRef"
    :as="as"
    :as-child="asChild"
    v-bind="buttonProps"
    :class="cls"
  >
    <slot name="startContent" />
    <slot v-if="isLoading && spinnerPlacement === 'start'" name="spinner">
      <Spinner color="current" :size="spinnerSize" />
    </slot>
    <slot />
    <slot v-if="isLoading && spinnerPlacement === 'end'" name="spinner">
      <Spinner color="current" :size="spinnerSize" />
    </slot>
    <slot name="endContent" />
    <Ripple v-if="!disableRipple" :ripples="ripples" @clear="onClear" />
  </Primitive>
</template>
