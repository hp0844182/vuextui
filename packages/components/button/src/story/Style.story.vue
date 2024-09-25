<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Button,
} from '../'
import UserIcon from './UserIcon.vue'
import CameraIcon from './CameraIcon.vue'

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
    auto-props-disabled
  >
    <!-- :layout="{ type: 'grid', width: '50%' }" -->
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
        <Button color="primary" :is-loading="true">
          <template #spinner>
            <svg
              class="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                class="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
                strokeWidth="4"
              />
            </svg>
          </template>
          Loading
        </Button>
      </div>
    </Variant>

    <Variant title="icon">
      <div className="flex gap-4 items-center py-4">
        <Button color="success">
          <template #endContent>
            <CameraIcon class="w-6 h-6" />
          </template>
          Delete user
        </Button>
        <Button color="danger" variant="bordered">
          <template #startContent>
            <UserIcon class="w-6 h-6" />
          </template>
          Delete user
        </Button>
      </div>
    </Variant>
    <Variant title="icon only">
      <div className="flex gap-4 items-center py-4">
        <Button color="danger" is-icon-only>
          <CameraIcon class="w-6 h-6" />
        </Button>
        <Button color="warning" variant="faded" is-icon-only>
          <CameraIcon class="w-6 h-6" />
        </Button>
      </div>
    </Variant>
    <Variant title="custom style">
      <div className="flex gap-4 items-center py-4">
        <Button radius="full" class="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
          Custom style
        </Button>
      </div>
    </Variant>
  </Story>
</template>
