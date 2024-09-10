<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Button,
} from '../'

const values = ['One', 'Two', 'Three', 'Four']
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

const selectedValue = ref(['One', 'Two', 'Three', 'Four'])
</script>

<template>
  <Story
    title="Button/Animated"
    :layout="{ type: 'grid', width: '50%' }"
    auto-props-disabled
  >
    <Variant title="Closed by default">
      <!-- <template #controls>
        modelValue: <input v-model="hasDynamicContent" type="checkbox">
      </template> -->
      <Button class="my-4">
        123
      </Button>
    </Variant>
  </Story>
</template>
