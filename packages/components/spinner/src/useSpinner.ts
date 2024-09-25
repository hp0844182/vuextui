import { type SlotsToClasses, type SpinnerReturnType, type SpinnerSlots, type SpinnerVariantProps, spinner } from '@vue-nextui/theme'

import type { ComputedRef } from 'vue'
import { computed, useAttrs } from 'vue'

export interface SpinnerProps extends /* @vue-ignore */ SpinnerVariantProps {
  label?: string
  classNames?: SlotsToClasses<SpinnerSlots>
}

export function useSpinner(props: SpinnerProps): {
  slots: ComputedRef<SpinnerReturnType>
  baseProps: ComputedRef<Record<string, any>>
} {
  const attrs = useAttrs() as any
  const slots = computed(() => {
    return spinner({
      color: attrs.color,
      size: attrs.size,
      labelColor: attrs.labelColor,
    })
  })

  const ariaLabel = computed(() => {
    if (props.label) {
      return props.label
    }
    return attrs['aria-label'] ?? 'Loading...'
  })

  const baseProps = computed(() => {
    return {
      ...attrs as any,
      'size': undefined,
      'color': undefined,
      'labelColor': undefined,
      'classNames': undefined,
      'aria-label': ariaLabel.value,
      'class': slots.value.base({
        className: attrs.class as string,
      }),
    }
  })

  return {
    slots,
    baseProps,
  }
}
