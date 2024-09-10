<script setup lang="ts">
import type { AriaAttributes, ButtonHTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import type { PrimitiveProps } from 'radix-vue'
import { Primitive } from 'radix-vue'
import { useButton } from './useButton'
import type { ButtonVariantProps } from '@vue-nextui/theme'
import { button } from '@vue-nextui/theme'

type CombinedProps = /* @vue-ignore */ Omit<AriaAttributes, 'color'> & Omit<ButtonHTMLAttributes, 'color'>
export interface ButtonProps extends
  CombinedProps,
  /* @vue-ignore */ ButtonVariantProps,
  PrimitiveProps {
  onPress?: (e: Event) => void
  onPressStart?: (e: Event) => void
  onPressEnd?: (e: Event) => void
  onPressUp?: (e: Event) => void
  onPressChange?: (isPressed: boolean) => void
  preventFocusOnPress?: boolean
  allowFocusWhenDisabled?: boolean
  href?: string
  target?: string
  rel?: string
  isLoading?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'
  disableAnimation?: boolean
  isDisabled?: boolean
  fullWidth?: boolean
  isIconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  isInGroup?: boolean
}
const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  asChild: false,
})

const domRef = ref<HTMLElement | null>(null)
const { buttonProps } = useButton(props)

const cls = computed(() => {
  return button({
    color: props.color,
    variant: props.variant,
    disableAnimation: props.disableAnimation,
    isDisabled: props.isDisabled,
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
    <slot />
    <slot name="endContent" />
  </Primitive>
</template>
