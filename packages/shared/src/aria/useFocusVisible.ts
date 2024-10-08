import { onMounted, onUnmounted, readonly, ref } from 'vue'

const isFocusVisibleGlobal = ref(false)
let isInitialized = false
let listenerCount = 0
let hadFocusVisibleRecentlyTimeout: number | null = null
let hadKeyboardEvent = false
let hadMouseEvent = false
let hadFocusVisibleRecently = false

function handleEvents(e: Event) {
  switch (e.type) {
    case 'keydown':
      hadKeyboardEvent = true
      hadMouseEvent = false
      isFocusVisibleGlobal.value = true
      break
    case 'mousedown':
    case 'pointerdown':
    case 'touchstart':
      hadKeyboardEvent = false
      hadMouseEvent = true
      isFocusVisibleGlobal.value = false // 重置焦点可见状态
      break
    case 'focus':
      if (hadKeyboardEvent && !hadMouseEvent) {
        isFocusVisibleGlobal.value = true
        hadFocusVisibleRecently = true
        window.clearTimeout(hadFocusVisibleRecentlyTimeout!)
        hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
          hadFocusVisibleRecently = false
        }, 100)
      }
      break
    case 'blur':
      if (hadFocusVisibleRecently) {
        isFocusVisibleGlobal.value = false
      }
      break
    case 'visibilitychange':
      if (document.visibilityState === 'hidden') {
        hadKeyboardEvent = false
        hadMouseEvent = false
      }
      break
  }
}

const eventListeners = [
  { event: 'keydown', handler: handleEvents },
  { event: 'mousedown', handler: handleEvents },
  { event: 'pointerdown', handler: handleEvents },
  { event: 'touchstart', handler: handleEvents },
  { event: 'visibilitychange', handler: handleEvents },
  { event: 'focus', handler: handleEvents },
  { event: 'blur', handler: handleEvents },
]

const addEventListeners = () => eventListeners.forEach(({ event, handler }) => document.addEventListener(event, handler, true))
const removeEventListeners = () => eventListeners.forEach(({ event, handler }) => document.removeEventListener(event, handler, true))

export function useFocusVisible() {
  onMounted(() => {
    listenerCount++
    if (!isInitialized) {
      addEventListeners()
      isInitialized = true
    }
  })

  onUnmounted(() => {
    listenerCount--
    if (listenerCount === 0) {
      removeEventListeners()
      isInitialized = false
      if (hadFocusVisibleRecentlyTimeout) {
        window.clearTimeout(hadFocusVisibleRecentlyTimeout)
      }
    }
  })

  return {
    isFocusVisible: readonly(isFocusVisibleGlobal),
  }
}
