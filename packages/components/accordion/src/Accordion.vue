<script setup lang="ts">
import { AccordionRoot } from 'radix-vue'
import { type AccordionProps, useAccordion } from './use-accordion'

const props = withDefaults(defineProps<AccordionProps>(), {
})
const { baseProps, className } = useAccordion(props)
</script>

<template>
  <AccordionRoot v-bind="baseProps" :class="className">
    <slot />
  </AccordionRoot>
</template>
