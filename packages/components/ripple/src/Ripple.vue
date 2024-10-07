<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { type RippleType, clamp } from './useRipple'
import { AnimatePresence, Motion } from '@vue-nextui/motion'

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
  <AnimatePresence multiple>
    <Motion
      v-for="ripple in ripples"
      :key="ripple.key"
      as="span"
      :initial="{
        opacity: 0.35,
        transform: 'scale(0)',
      }"
      :animate="{
        transform: ['scale(0)', 'scale(2)'],
        opacity: 0,
        transition: {
          duration: duration(ripple),
          onComplete: () => onClear(ripple.key),
        },
      }"
      :exit="{
        opacity: 0,
      }"
      :style="{
        position: 'absolute',
        backgroundColor: color,
        borderRadius: '100%',
        transformOrigin: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
        inset: 0,
        zIndex: 0,
        top: `${ripple.y}px`,
        left: `${ripple.x}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
        ...style,
      }"
    />
  </AnimatePresence>
</template>
