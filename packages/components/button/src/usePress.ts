import { onMounted, onUnmounted, ref } from 'vue'

export type PointerType = 'mouse' | 'pen' | 'touch' | 'keyboard' | 'virtual'

export interface PressEvent {
  /** 触发的按压事件类型。 */
  type: 'pressstart' | 'pressend' | 'pressup' | 'press'
  /** 触发按压事件的指针类型。 */
  pointerType: PointerType
  /** 按压事件的目标元素。 */
  target: Element
  /** 按压事件期间是否按下了shift键。 */
  shiftKey: boolean
  /** 按压事件期间是否按下了ctrl键。 */
  ctrlKey: boolean
  /** 按压事件期间是否按下了meta键。 */
  metaKey: boolean
  /** 按压事件期间是否按下了alt键。 */
  altKey: boolean
  /** 相对于目标的X坐标。 */
  x: number
  /** 相对于目标的Y坐标。 */
  y: number
  /**
   * 默认情况下，按压事件会停止向父元素传播。
   * 在处理程序决定不处理特定事件的情况下，
   * 可以调用`continuePropagation()`允许父元素处理它。
   */
  // continuePropagation: () => void
}

interface UsePressOptions {
  onPressStart?: (e: PressEvent) => void
  onPressEnd?: (e: PressEvent) => void
  onPressChange?: (isPressed: boolean) => void
  onPress?: (e: PressEvent) => void
  onPressUp?: (e: PressEvent) => void
  isDisabled?: boolean
  preventFocusOnPress?: boolean
}

// 将 preventDefault 移到外部作用域
function preventDefault(e: Event) {
  e.preventDefault()
}

function createPressEvent(e: PointerEvent | KeyboardEvent, type: PressEvent['type']): PressEvent {
  return {
    type,
    pointerType: (e as PointerEvent).pointerType as PointerType || 'keyboard',
    target: e.target as Element,
    shiftKey: e.shiftKey || false,
    ctrlKey: e.ctrlKey || false,
    metaKey: e.metaKey || false,
    altKey: e.altKey || false,
    x: (e as PointerEvent).clientX || 0,
    y: (e as PointerEvent).clientY || 0,
  }
}

export function usePress(options: UsePressOptions) {
  const isPressed = ref(false)
  const state = {
    ignoreClickAfterPress: false,
  }
  const handlePressStart = (e: PointerEvent | KeyboardEvent) => {
    if (options.isDisabled || isPressed.value)
      return
    isPressed.value = true
    const pressEvent = createPressEvent(e, 'pressstart')
    options.onPressStart?.(pressEvent)
    options.onPressChange?.(true)
  }

  const handlePressUp = (e: PointerEvent | KeyboardEvent) => {
    if (options.isDisabled || !isPressed.value)
      return

    const pressEvent = createPressEvent(e, 'pressup')
    options.onPressUp?.(pressEvent)
  }

  const handlePress = (e: PointerEvent | KeyboardEvent) => {
    if (options.isDisabled)
      return
    const pressEvent = createPressEvent(e, 'press')
    options.onPress?.(pressEvent)
  }

  const handlePressEnd = (e: PointerEvent | KeyboardEvent) => {
    if (options.isDisabled || !isPressed.value)
      return
    isPressed.value = false
    state.ignoreClickAfterPress = true
    const pressEvent = createPressEvent(e, 'pressend')
    options.onPressEnd?.(pressEvent)
    options.onPressChange?.(false)
    handlePress(e)
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
    onPointerdown: handlePressStart,
    onPointerup: (e: PointerEvent) => {
      handlePressUp(e)
      handlePressEnd(e)
    },
    onPointerleave: handlePressEnd,
    onPointercancel: handlePressEnd,
    onClick: (e: PointerEvent) => {
      if (isPressed.value) {
        return
      }
      if (!state.ignoreClickAfterPress) {
        handlePressStart(e)
        handlePressUp(e)
        handlePressEnd(e)
      }
      state.ignoreClickAfterPress = false
    },
    onKeydown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handlePressStart(e)
      }
    },
    onKeyup: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handlePressUp(e)
        handlePressEnd(e)
      }
    },
  }

  return {
    pressProps,
    isPressed,
  }
}
