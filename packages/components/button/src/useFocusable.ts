import { computed, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export interface FocusableOptions {
  /** 是否禁用焦点 */
  isDisabled?: boolean
  /** 是否从Tab顺序中排除 */
  excludeFromTabOrder?: boolean
  /** 是否自动聚焦 */
  autoFocus?: boolean
}

export function useFocusable(props: FocusableOptions, domRef: Ref<HTMLElement | null>) {
  const isFocused = ref(false)
  const autoFocusRef = ref(props.autoFocus)

  const handleFocus = () => {
    if (!props.isDisabled) {
      isFocused.value = true
    }
  }

  const handleBlur = () => {
    isFocused.value = false
  }

  const handleKeyDown = (_event: KeyboardEvent) => {
    if (!props.isDisabled) {
      // 在这里处理键盘事件
    }
  }

  watch(() => props.autoFocus, (newValue) => {
    autoFocusRef.value = newValue
  })

  onMounted(() => {
    if (autoFocusRef.value && domRef.value) {
      domRef.value.focus()
    }
  })

  const focusableProps = computed(() => ({
    tabIndex: props.excludeFromTabOrder || props.isDisabled ? -1 : 0,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeydown: handleKeyDown,
  }))

  const focus = () => {
    if (!props.isDisabled && domRef.value) {
      domRef.value.focus()
    }
  }

  const blur = () => {
    if (domRef.value) {
      domRef.value.blur()
    }
  }

  return {
    focusableProps,
    isFocused,
    focus,
    blur,
  }
}
