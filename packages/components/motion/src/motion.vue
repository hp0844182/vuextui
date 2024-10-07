<script lang="ts">
import type { CSSProperties, IntrinsicElementAttributes } from 'vue'

type ElementType = keyof IntrinsicElementAttributes
</script>

<script setup lang="ts" generic="T extends ElementType = 'div'">
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import type { Options } from './state/types'
import { Primitive } from 'radix-vue'
import { usePrimitiveElement } from './usePrimitiveElement'
import { injectMotion, provideMotion } from './context'
import { injectAnimatePresence } from './presence'
import { createMotionState } from './state'
import { createStyles, style } from './state/style'

export interface MotionProps<T extends ElementType = 'div'> extends Options {
  as?: T
  asChild?: boolean
  style?: CSSProperties
}

type ComBindProps = Omit<IntrinsicElementAttributes[T], keyof Options | 'style' | 'as' | 'asChild'>

const props = withDefaults(defineProps<MotionProps<T> & /* @vue-ignore */ ComBindProps>(), {
  as: 'div' as T,
  asChild: false,
} as any) as MotionProps<T>

const { initial: presenceInitial } = injectAnimatePresence({ initial: ref(false) })
const parentState = injectMotion(null)
const state = createMotionState(
  {
    ...props,
  },
  parentState!,
)
provideMotion(state)

const { primitiveElement, currentElement } = usePrimitiveElement()
let unmount: () => void
onMounted(() => {
  unmount = state.mount(currentElement.value)
  state.update({
    ...props,
    initial: presenceInitial.value === false
      ? presenceInitial.value
      : (
          props.initial === true ? undefined : props.initial
        ),
  })
})

onUnmounted(() => {
  unmount()
})

let manuallyAppliedMotionStyles = false
onUpdated(() => {
  /**
   * Vue reapplies all styles every render, rather than diffing and
   * only reapplying the ones that change. This means that initially
   * calculated motion styles also get reapplied every render, leading
   * to incorrect animation origins.
   *
   * To prevent this, once an element is mounted we hand over these
   * styles to Motion. This will currently still lead to a jump if interrupting
   * transforms in browsers where the number polyfill is used.
   */
  if (!manuallyAppliedMotionStyles && currentElement.value) {
    manuallyAppliedMotionStyles = true

    const styles = createStyles(state.getTarget())
    for (const key in styles) {
      style.set(currentElement.value, key, styles[key])
    }
  }

  state.update({
    ...props,
    initial: presenceInitial.value === false
      ? presenceInitial.value
      : (
          props.initial === true ? undefined : props.initial
        ),
  })
})

function getStyle() {
  return state.isMounted() ? props.style : { ...props.style, ...createStyles(state.getTarget()) }
}
</script>

<template>
  <!-- @vue-ignore -->
  <Primitive
    ref="primitiveElement" :as="as" :as-child="asChild"
    :style="getStyle()"
  >
    <slot />
  </Primitive>
</template>
