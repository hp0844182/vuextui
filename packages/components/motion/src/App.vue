<script setup lang="ts" generic="T extends string">
import { ref } from 'vue'
import Motion from './motion.vue'
import { Motion as MotionOne } from '@motionone/vue'
import AnimatePresence from './AnimatePresence.vue'

const count = ref(0)
const ani = ref(false)
</script>

<template>
  <div style="display: flex;flex-direction: column;gap: 20px;padding: 100px;">
    <h1>Vue + TypeScript + Vite</h1>
    <p @click="count++">
      Count: {{ count }}
    </p>
    <AnimatePresence>
      <!-- 123 -->
      <p
        v-show="ani"
        key="1"
      >
        123
      </p>
    </AnimatePresence>
    <Motion
      :key="ani ? 1 : 2"
      as="div"
      as-child
      :initial="{
        scale: 0.5,
      }"
      :transition="{ duration: 10 }"
      style="width: 100px;height:100px;background-color:red"
      @click="ani = !ani"
    >
      <p>123</p>
    </Motion>
    <MotionOne
      :key="ani ? 11 : 22"
      :initial="{
        scale: 0.5,
      }"
      :animate="{
        scale: 1.5,
      }"
      :transition="{ duration: 0.5 }"
      style="width: 100px;height:100px;background-color:red"
      @click="ani = !ani"
    />
  </div>
</template>
