import { createContext } from 'radix-vue'
import type { Ref } from 'vue'

export const doneCallbacks = new WeakMap<Element, VoidFunction>()

export function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element)

  if (prevDoneCallback) {
    element.removeEventListener('motioncomplete', prevDoneCallback)
  }
  doneCallbacks.delete(element)
}

export interface PresenceContext {
  initial: Ref<boolean>
}

export const [injectAnimatePresence, provideAnimatePresence] = createContext<PresenceContext>('AnimatePresenceContext')
