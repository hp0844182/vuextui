import { computed, ref } from 'vue'

export type RippleType = {
  key: string | number
  x: number
  y: number
  size: number
}

export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`
}
export function useRipple() {
  const ripples = ref<RippleType[]>([])

  const onClick = (event: MouseEvent) => {
    const trigger = event.currentTarget as HTMLElement

    const size = Math.max(trigger.clientWidth, trigger.clientHeight)
    const rect = trigger.getBoundingClientRect()

    ripples.value = [
      ...ripples.value,
      {
        key: getUniqueID(ripples.value.length.toString())!,
        size,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
      },
    ]
  }

  const onClear = (key: string | number) => {
    ripples.value = ripples.value.filter(ripple => ripple.key !== key)
  }

  return { ripples: computed(() => ripples.value), onClick, onClear }
}

export type UseRippleReturn = ReturnType<typeof useRipple>

/**
 * Clamps a value between a minimum and maximum range.
 *
 * @param value - The value to be clamped.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max) * 1000
}
