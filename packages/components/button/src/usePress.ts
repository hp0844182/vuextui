import { onMounted, onUnmounted, ref } from 'vue'

interface UsePressOptions {
  onPressStart?: (e: Event) => void
  onPressEnd?: (e: Event) => void
  onPressChange?: (isPressed: boolean) => void
  onPress?: (e: Event) => void
  onPressUp?: (e: Event) => void
  isDisabled?: boolean
  preventFocusOnPress?: boolean
}

export function usePress(options: UsePressOptions) {
  const isPressed = ref(false)

  const handlePressStart = (e: Event) => {
    if (options.isDisabled)
      return

    isPressed.value = true
    options.onPressStart?.(e)
    options.onPressChange?.(true)
  }

  const handlePressEnd = (e: Event) => {
    if (options.isDisabled)
      return

    isPressed.value = false
    options.onPressEnd?.(e)
    options.onPressChange?.(false)
    options.onPress?.(e)
  }

  const handlePressUp = (e: Event) => {
    if (options.isDisabled)
      return

    options.onPressUp?.(e)
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const preventDefault = (e: Event) => {
    e.preventDefault()
  }

  onMounted(() => {
    if (options.preventFocusOnPress) {
      document.addEventListener('mousedown', preventDefault)
    }
  })

  onUnmounted(() => {
    if (options.preventFocusOnPress) {
      document.removeEventListener('mousedown', preventDefault)
    }
  })

  const pressProps = {
    onMousedown: handlePressStart,
    onMouseup: handlePressEnd,
    onMouseleave: handlePressEnd,
    onTouchstart: handlePressStart,
    onTouchend: handlePressEnd,
    onClick: (e: Event) => {
      handlePressStart(e)
      handlePressEnd(e)
      handlePressUp(e)
    },
    onKeydown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handlePressStart(e)
      }
    },
    onKeyup: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handlePressEnd(e)
        handlePressUp(e)
      }
    },
  }

  return {
    pressProps,
    isPressed,
  }
}
