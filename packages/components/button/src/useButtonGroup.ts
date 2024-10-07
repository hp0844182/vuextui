import type { ButtonGroupVariantProps } from '@vue-nextui/theme'
import type { ButtonProps } from './useButton'

interface ButtonGroupProps extends ButtonGroupVariantProps {
  isDisabled?: ButtonProps['isDisabled']
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
