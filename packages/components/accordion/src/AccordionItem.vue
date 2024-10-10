<script setup lang="ts">
import { AccordionHeader, AccordionItem, AccordionTrigger } from 'radix-vue'
import { type UserAccordionItemProps, useAccordionItem } from './use-accordion-item'

export interface AccordionItemProps extends UserAccordionItemProps {}

const props = withDefaults(defineProps<AccordionItemProps>(), {
})

const { baseProps, clsSlots } = useAccordionItem(props)
</script>

<template>
  <AccordionItem
    v-bind="baseProps"
  >
    <AccordionHeader
      :class="clsSlots.heading({
        className: classNames?.heading,
      })"
    >
      <AccordionTrigger>
        <slot />
      </AccordionTrigger>
    </AccordionHeader>
  </AccordionItem>
</template>
