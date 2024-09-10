import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

interface HoverEvents {
  onHoverStart?: (event: HoverEvent) => void
  onHoverChange?: (isHovering: boolean) => void
  onHoverEnd?: (event: HoverEvent) => void
}

interface HoverProps extends HoverEvents {
  isDisabled?: Ref<boolean>
}

interface HoverEvent {
  type: 'hoverstart' | 'hoverend'
  target: EventTarget | null
  pointerType: string
}

interface HoverResult {
  hoverProps: ComputedRef<Record<string, any>>
  isHovered: Ref<boolean>
}

let globalIgnoreEmulatedMouseEvents = false
let hoverCount = 0

function setGlobalIgnoreEmulatedMouseEvents() {
  globalIgnoreEmulatedMouseEvents = true
  setTimeout(() => {
    globalIgnoreEmulatedMouseEvents = false
  }, 50)
}

function handleGlobalPointerEvent(e: PointerEvent) {
  if (e.pointerType === 'touch') {
    setGlobalIgnoreEmulatedMouseEvents()
  }
}

function setupGlobalTouchEvents() {
  if (typeof document === 'undefined') {
    return
  }
  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerup', handleGlobalPointerEvent)
  }
  else {
    document.addEventListener('touchend', setGlobalIgnoreEmulatedMouseEvents)
  }

  hoverCount++
  return () => {
    hoverCount--
    if (hoverCount > 0) {
      return
    }

    if (typeof PointerEvent !== 'undefined') {
      document.removeEventListener('pointerup', handleGlobalPointerEvent)
    }
    else {
      document.removeEventListener('touchend', setGlobalIgnoreEmulatedMouseEvents)
    }
  }
}

export function useHover(props: HoverProps): HoverResult {
  const { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props
  const isHovered = ref(false)
  const state = reactive({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: '',
    target: null as EventTarget | null,
  })

  onMounted(setupGlobalTouchEvents)
  onUnmounted(setupGlobalTouchEvents)

  const triggerHoverStart = (event: Event, pointerType: string) => {
    state.pointerType = pointerType
    if (isDisabled?.value || pointerType === 'touch' || state.isHovered || !(event.currentTarget as Node).contains(event.target as Node)) {
      return
    }

    state.isHovered = true
    const target = event.currentTarget
    state.target = target

    if (onHoverStart) {
      onHoverStart({ type: 'hoverstart', target, pointerType })
    }

    if (onHoverChange) {
      onHoverChange(true)
    }

    isHovered.value = true
  }

  const triggerHoverEnd = (event: Event, pointerType: string) => {
    state.pointerType = ''
    state.target = null

    if (pointerType === 'touch' || !state.isHovered) {
      return
    }
    state.isHovered = false
    const target = event.currentTarget
    if (onHoverEnd) {
      onHoverEnd({ type: 'hoverend', target, pointerType })
    }

    if (onHoverChange) {
      onHoverChange(false)
    }

    isHovered.value = false
  }

  const hoverProps = computed(() => {
    const props: Record<string, any> = {}
    if (typeof PointerEvent !== 'undefined') {
      props.onPointerenter = (e: PointerEvent) => {
        if (globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse') {
          return
        }
        triggerHoverStart(e, e.pointerType)
      }

      props.onPointerleave = (e: PointerEvent) => {
        if (!isDisabled?.value && (e.currentTarget as Node).contains(e.target as Node)) {
          triggerHoverEnd(e, e.pointerType)
        }
      }
    }
    else {
      props.onTouchstart = () => {
        state.ignoreEmulatedMouseEvents = true
      }

      props.onMouseenter = (e: MouseEvent) => {
        if (!state.ignoreEmulatedMouseEvents && !globalIgnoreEmulatedMouseEvents) {
          triggerHoverStart(e, 'mouse')
        }
        state.ignoreEmulatedMouseEvents = false
      }

      props.onMouseleave = (e: MouseEvent) => {
        if (!isDisabled?.value && (e.currentTarget as Node).contains(e.target as Node)) {
          triggerHoverEnd(e, 'mouse')
        }
      }
    }
    return props
  })

  return {
    hoverProps,
    isHovered,
  }
}
