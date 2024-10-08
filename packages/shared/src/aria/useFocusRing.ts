import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useFocusVisible } from './useFocusVisible'

interface AriaFocusRingProps {
  within?: boolean
  isTextInput?: boolean
  autoFocus?: boolean
}

interface FocusRingAria {
  isFocused: Ref<boolean>
  isFocusVisible: ComputedRef<boolean>
  focusProps: {
    onFocus?: () => void
    onBlur?: () => void
  }
}

export function useFocusRing(props: AriaFocusRingProps = {}): FocusRingAria {
  const { autoFocus = false, within = false } = props

  const isFocused = ref(false)
  const { isFocusVisible: focusVisibleState } = useFocusVisible()

  const isFocusVisible = computed(() => isFocused.value && focusVisibleState.value)
  const onFocusChange = (focused: boolean) => {
    isFocused.value = focused
  }

  const focusProps = computed(() => ({
    onFocus: () => onFocusChange(true),
    onBlur: () => onFocusChange(false),
  }))

  onMounted(() => {
    if (autoFocus) {
      onFocusChange(true)
    }
  })

  return {
    isFocused,
    isFocusVisible: computed(() => {
      return isFocused.value && isFocusVisible.value
    }),
    focusProps: within ? {} : focusProps.value,
  }
}
