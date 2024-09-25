import type { ButtonGroupVariantProps } from '@vue-nextui/theme'
import type { ButtonProps } from './useButton'

interface ButtonGroupProps extends ButtonGroupVariantProps {
  isDisabled?: ButtonProps['isDisabled']
}

export type ContextType = {
  size?: ButtonProps['size']
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  radius?: ButtonProps['radius']
  isDisabled?: ButtonProps['isDisabled']
  disableAnimation?: ButtonProps['disableAnimation']
  disableRipple?: ButtonProps['disableRipple']
  isIconOnly?: ButtonProps['isIconOnly']
  fullWidth?: boolean
}

export type UseButtonGroupProps = ButtonGroupProps &
  Partial<
    Pick<
      ButtonProps,
      'size' | 'color' | 'radius' | 'variant' | 'isIconOnly' | 'disableAnimation' | 'disableRipple'
    >
  >

export function useButtonGroup() {

}
