<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Button,
  ButtonGroup,
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
    title="ButtonGroup"
    auto-props-disabled
  >
    <!-- :layout="{ type: 'grid', width: '50%' }" -->
    <Variant title="ButtonGroup">
      <div class="py-4">
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </div>
    </Variant>
    <Variant title="Group Disabled">
      <div class="py-4">
        <ButtonGroup is-disabled>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </div>
    </Variant>
  </Story>
</template>
