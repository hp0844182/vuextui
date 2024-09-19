<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { type RippleType, clamp } from './useRipple'
import { MotionDirective } from '@vueuse/motion'

defineOptions({
  directives: {
    motion: MotionDirective(),
  },
})

withDefaults(defineProps<{
  ripples: RippleType[]
  color?: string
  style?: CSSProperties
  onClear: (key: string | number) => void
}>(), {
  color: 'currentColor',
  ripples: () => [],
})

const duration = (ripple: RippleType) => clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5)
</script>

<template>
  <span
    v-for="ripple in ripples"
    :key="ripple.key"
    v-motion
    :initial="{
      scale: 0,
      opacity: 0.35,
    }"
    :enter="{
      scale: 2,
      opacity: 0,
      transition: {
        duration: duration(ripple),
        onComplete: () => onClear(ripple.key),
      },
    }"
    :leave="{
      opacity: 0,
    }"
    :style="{
      position: 'absolute',
      backgroundColor: color,
      borderRadius: '100%',
      transformOrigin: 'center',
      pointerEvents: 'none',
      overflow: 'hidden',
      transform: 'scale(0)',
      inset: 0,
      zIndex: 0,
      top: `${ripple.y}px`,
      left: `${ripple.x}px`,
      width: `${ripple.size}px`,
      height: `${ripple.size}px`,
      ...style,
    }"
  />
</template>
