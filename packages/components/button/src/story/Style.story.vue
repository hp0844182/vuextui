<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Button,
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
    title="Button/Basic"
    :layout="{ type: 'grid', width: '50%' }"
    auto-props-disabled
  >
    <Variant title="基础使用">
      <!-- <template #controls>
        modelValue: <input v-model="hasDynamicContent" type="checkbox">
      </template> -->
      <div class="py-4">
        <Button color="primary">
          Button
        </Button>
      </div>
    </Variant>
    <Variant title="disabled">
      <!-- <template #controls>
        modelValue: <input v-model="hasDynamicContent" type="checkbox">
      </template> -->
      <div class="py-4">
        <Button color="primary" :is-disabled="true">
          Button
        </Button>
      </div>
    </Variant>
    <Variant title="size">
      <div className="flex gap-4 items-center">
        <Button size="sm">
          Small
        </Button>
        <Button size="md">
          Medium
        </Button>
        <Button size="lg">
          Large
        </Button>
      </div>
    </Variant>
    <Variant title="radius">
      <div className="flex gap-4 items-center">
        <Button radius="none">
          None
        </Button>
        <Button radius="sm">
          Small
        </Button>
        <Button radius="md">
          Medium
        </Button>
        <Button radius="lg">
          Large
        </Button>
        <Button radius="full">
          Full
        </Button>
      </div>
    </Variant>

    <Variant title="color">
      <div className="flex gap-4 items-center">
        <Button color="default">
          Default
        </Button>
        <Button color="primary">
          Primary
        </Button>
        <Button color="secondary">
          Secondary
        </Button>
        <Button color="success">
          Success
        </Button>
        <Button color="warning">
          Warning
        </Button>
        <Button color="danger">
          Danger
        </Button>
      </div>
    </Variant>

    <Variant title="variant">
      <div className="flex gap-4 items-center py-4">
        <Button variant="solid" color="primary">
          Solid
        </Button>
        <Button variant="faded" color="primary">
          Outline
        </Button>
        <Button variant="bordered" color="primary">
          Ghost
        </Button>
        <Button variant="light" color="primary">
          Light
        </Button>
        <Button variant="flat" color="primary">
          Shadow
        </Button>
        <Button variant="ghost" color="primary">
          Ghost
        </Button>
        <Button variant="shadow" color="primary">
          Shadow
        </Button>
      </div>
    </Variant>

    <Variant title="loading">
      <div className="flex gap-4 items-center py-4">
        <Button color="primary" :is-loading="true">
          Loading
        </Button>
      </div>
    </Variant>
  </Story>
</template>
