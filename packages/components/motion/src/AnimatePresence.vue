<script setup lang="ts">
import { Transition, TransitionGroup, toRefs } from 'vue'
import { mountedStates } from './state'
import { doneCallbacks, provideAnimatePresence, removeDoneCallback } from './presence'

export interface AnimatePresenceProps {
  mode?: 'wait' | 'popLayout' | 'sync'
  initial?: boolean
  multiple?: boolean
}

defineOptions({
  name: 'AnimatePresence',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AnimatePresenceProps>(), {
  mode: 'sync',
  initial: true,
  multiple: false,
})

const { initial } = toRefs(props)

provideAnimatePresence({
  initial,
})

function enter(el: Element) {
  const state = mountedStates.get(el)
  if (!state) {
    return
  }
  removeDoneCallback(el)
  state.setActive('exit', false)
}

function exit(el: Element, done: VoidFunction) {
  const state = mountedStates.get(el)
  if (!state) {
    return done()
  }
  state.setActive('exit', true)
  removeDoneCallback(el)
  doneCallbacks.set(el, done)
  el.addEventListener('motioncomplete', done)
}
</script>

<template>
  <component
    :is="multiple ? TransitionGroup : Transition"
    :css="false"
    :mode="mode === 'wait' ? 'out-in' : undefined"
    v-bind="$attrs"
    @enter="enter"
    @exit="exit"
  >
    <slot />
  </component>
</template>

<style scoped>

</style>
