<script setup lang="ts">
import { computed, ref } from 'vue'
import { Primitive } from 'radix-vue'
import type { ButtonProps } from './useButton'
import { useButton } from './useButton'
import { button } from '@vue-nextui/theme'
import { Ripple } from '@vue-nextui/ripple'
import { Spinner } from '@vue-nextui/spinner'
import { injectButtonGroupContext } from './context'
import { isDef } from '@vueuse/core'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  asChild: false,
  spinnerPlacement: 'start',
  isDisabled: undefined,
  isIconOnly: undefined,
  isLoading: undefined,
})

const domRef = ref<HTMLElement | null>(null)
const { buttonProps, onClear, ripples, spinnerSize } = useButton(props)
const btnGroupCtx = injectButtonGroupContext(null)
const variantProps = computed(() => ({
  color: isDef(props.color) ? props.color : btnGroupCtx?.value?.color,
  variant: isDef(props.variant) ? props.variant : btnGroupCtx?.value?.variant,
  radius: (isDef(props.radius) ? props.radius : btnGroupCtx?.value?.radius),
  fullWidth: isDef(props.fullWidth) ? props.fullWidth : btnGroupCtx?.value?.fullWidth,
  isIconOnly: isDef(props.isIconOnly) ? props.isIconOnly : btnGroupCtx?.value?.isIconOnly,
  disableAnimation: isDef(props.disableAnimation) ? props.disableAnimation : btnGroupCtx?.value?.disableAnimation,
  disableRipple: isDef(props.disableRipple) ? props.disableRipple : btnGroupCtx?.value?.disableRipple,
  isDisabled: (isDef(props.isDisabled) ? props.isDisabled : btnGroupCtx?.value?.isDisabled) || props.isLoading,
  size: isDef(props.size) ? props.size : btnGroupCtx?.value?.size,
}))

const cls = computed(() => {
  return button({
    ...variantProps.value,
    isInGroup: !!btnGroupCtx?.value,
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
