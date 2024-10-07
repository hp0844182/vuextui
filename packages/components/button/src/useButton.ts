import type { AriaAttributes, ButtonHTMLAttributes } from 'vue'
import { computed, mergeProps, toRefs } from 'vue'
import type { ButtonVariantProps } from '@vue-nextui/theme'
import type { PrimitiveProps } from 'radix-vue'
import type { PressEvent } from './usePress'
import { usePress } from './usePress'
import { useFocusRing } from './useFocusRing'
import { dataAttr } from './utils'
import { useHover } from './useHover'
import { useRipple } from '../../ripple/src'
import type { SpinnerProps } from '@vue-nextui/spinner'

type CombinedProps = /* @vue-ignore */ Omit<AriaAttributes, 'color'> & Omit<ButtonHTMLAttributes, 'color'>
export interface ButtonProps extends
  CombinedProps,
  /* @vue-ignore */ButtonVariantProps,
  PrimitiveProps {
  onPress?: (e: PressEvent) => void
  onPressStart?: (e: PressEvent) => void
  onPressEnd?: (e: PressEvent) => void
  onPressUp?: (e: PressEvent) => void
  onPressChange?: (isPressed: boolean) => void
  preventFocusOnPress?: boolean
  allowFocusWhenDisabled?: boolean
  href?: string
  target?: string
  rel?: string
  isLoading?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'
  disableAnimation?: boolean
  isDisabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  spinnerPlacement?: 'start' | 'end'
  disableRipple?: boolean
  isIconOnly?: ButtonVariantProps['isIconOnly']
}

function useButton(props: ButtonProps) {
  const {
    as,
    isLoading,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange,
    preventFocusOnPress,
    onClick: deprecatedOnClick,
    href,
    target,
    rel,
    type,
  } = toRefs(props)

  const additionalProps = computed(() => {
    if (as?.value === 'button') {
      return {
        type: type?.value,
        disabled: isDisabled?.value,
      }
    }
    return {
      'role': 'button',
      'tabIndex': isDisabled?.value ? undefined : 0,
      'href': as?.value === 'a' && isDisabled?.value ? undefined : href?.value,
      'target': as?.value === 'a' ? target?.value : undefined,
      'type': as?.value === 'input' ? type?.value : undefined,
      'disabled': as?.value === 'input' ? isDisabled?.value : undefined,
      'aria-disabled': !isDisabled?.value || as?.value === 'input' ? undefined : isDisabled?.value,
      'rel': as?.value === 'a' ? rel?.value : undefined,
    }
  })

  const spinnerSize = computed(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps['size']> = {
      sm: 'sm',
      md: 'sm',
      lg: 'md',
    }

    return buttonSpinnerSizeMap[props.size || 'md']
  })

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { isHovered, hoverProps } = useHover({ isDisabled })

  const { pressProps, isPressed } = usePress({
    onPressStart: onPressStart?.value,
    onPressEnd: onPressEnd?.value,
    onPressChange: onPressChange?.value,
    onPress: onPress?.value,
    onPressUp: onPressUp?.value,
    isDisabled: isDisabled?.value,
    preventFocusOnPress: preventFocusOnPress?.value,
  })

  const { focusProps, isFocused, isFocusVisible } = useFocusRing()

  const { onClear, onClick, ripples } = useRipple()
  const buttonProps = computed(() => (mergeProps(pressProps, additionalProps.value, {
    'aria-haspopup': props['aria-haspopup'],
    'aria-expanded': props['aria-expanded'],
    'aria-controls': props['aria-controls'],
    'data-disabled': dataAttr(isDisabled?.value),
    'data-focus': dataAttr(isFocused.value),
    'aria-pressed': dataAttr(isPressed.value),
    'data-pressed': dataAttr(isPressed.value),
    'data-focus-visible': dataAttr(isFocusVisible.value),
    'data-hover': dataAttr(isHovered.value),
    'data-loading': dataAttr(isLoading?.value),
    'onClick': (e: MouseEvent) => {
      onClick(e)
      if (deprecatedOnClick?.value) {
        deprecatedOnClick.value(e)
        console.warn('onClick is deprecated, please use onPress')
      }
    },
  }, focusProps, hoverProps.value)))

  return {
    isPressed,
    buttonProps,
    ripples,
    onClear,
    spinnerSize,
  }
}

export { useButton }
