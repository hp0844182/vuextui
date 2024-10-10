import type { AccordionGroupVariantProps } from '@vue-nextui/theme'
import type { AccordionRootProps } from 'radix-vue'
import { computed } from 'vue'
import { accordion } from '@vue-nextui/theme'

export interface AccordionProps extends AccordionRootProps, AccordionGroupVariantProps {
  class?: string
}

export function useAccordion(props: AccordionProps) {
  const baseProps = computed(() => {
    return {
      as: props.as,
      asChild: props.asChild,
      type: props.type,
      defaultValue: props.defaultValue,
      modelValue: props.modelValue,
      dir: props.dir,
      disabled: props.disabled,
      orientation: props.orientation,
      collapsible: props.collapsible,
    }
  })

  const className = computed(() => {
    return accordion({
      variant: props.variant,
      fullWidth: props.fullWidth,
      className: props.class,
    })
  })

  return {
    baseProps,
    className,
  }
}
