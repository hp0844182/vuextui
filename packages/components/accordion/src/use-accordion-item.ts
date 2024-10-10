import type { AccordionItemSlots, AccordionItemVariantProps, SlotsToClasses } from '@vue-nextui/theme'
import type { AccordionItemProps } from 'radix-vue'
import { accordionItem } from '@vue-nextui/theme'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export interface UserAccordionItemProps extends AccordionItemVariantProps, AccordionItemProps {
  classNames?: SlotsToClasses<AccordionItemSlots>
  class?: string
}

export function useAccordionItem(props: UserAccordionItemProps): {
  clsSlots: ComputedRef<ReturnType<typeof accordionItem>>
  baseProps: ComputedRef<UserAccordionItemProps>
} {
  const clsSlots = computed(() => {
    return accordionItem({
      variant: props.variant,
      isCompact: props.isCompact,
      isDisabled: props.isDisabled,
      hideIndicator: props.hideIndicator,
      disableAnimation: props.disableAnimation,
      disableIndicatorAnimation: props.disableIndicatorAnimation,
      // motionProps: props.motionProps,
    })
  })

  const baseProps = computed(() => {
    return {
      as: props.as,
      asChild: props.asChild,
      disabled: props.disabled,
      value: props.value,
      class: clsSlots.value.base({
        className: [props.classNames?.base, props.class],
      }),
    }
  })

  return {
    clsSlots,
    baseProps,
  }
}
