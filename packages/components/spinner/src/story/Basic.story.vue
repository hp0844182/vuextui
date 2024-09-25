<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Spinner,
} from '../'

const count = ref(1)
const hasDynamicContent = ref(false)
const timer = ref(0)

watch(hasDynamicContent, () => {
  if (hasDynamicContent.value) {
    timer.value = window.setInterval(() => {
      const nextCount = count.value < 5 ? count.value + 1 : count.value
      if (nextCount === 5)
        hasDynamicContent.value = false
      count.value = nextCount
    }, 3000)
  }
  else {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <Story
    title="Spinner/Basic"
    auto-props-disabled
  >
    <Variant title="基础使用">
      <div class="py-4">
        <Spinner class="text-primary" />
      </div>
    </Variant>
    <Variant title="size">
      <div className="flex gap-4">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    </Variant>
    <Variant title="with label">
      <div className="flex gap-4">
        <Spinner label="Loading..." color="warning" />
      </div>
    </Variant>
    <Variant title="label color">
      <div className="flex gap-4">
        <Spinner label="Default" color="default" label-color="foreground" />
        <Spinner label="Primary" color="primary" label-color="primary" />
        <Spinner label="Secondary" color="secondary" label-color="secondary" />
        <Spinner label="Success" color="success" label-color="success" />
        <Spinner label="Warning" color="warning" label-color="warning" />
        <Spinner label="Danger" color="danger" label-color="danger" />
      </div>
    </Variant>
  </Story>
</template>
