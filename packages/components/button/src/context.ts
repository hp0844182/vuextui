import { createContext } from 'radix-vue'
import type { ButtonProps } from './useButton'
import type { ComputedRef } from 'vue'

export type ContextType = ComputedRef<{
  size?: ButtonProps['size']
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  radius?: ButtonProps['radius']
  isDisabled?: ButtonProps['isDisabled']
  disableAnimation?: ButtonProps['disableAnimation']
  disableRipple?: ButtonProps['disableRipple']
  isIconOnly?: ButtonProps['isIconOnly']
  fullWidth?: boolean
}>
export const [injectButtonGroupContext, provideButtonGroupContext] = createContext<ContextType>('ButtonGroupContext')
