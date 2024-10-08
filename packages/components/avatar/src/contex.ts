import type { ComputedRef } from 'vue'
import type { AvatarVariantProps } from '@vue-nextui/theme'
import { createContext } from 'radix-vue'

type AvatarGroupContext = ComputedRef<{
  isGrid: boolean
  size: AvatarVariantProps['size']
  color: AvatarVariantProps['color']
  radius: AvatarVariantProps['radius']
  isDisabled: AvatarVariantProps['isDisabled']
  isBordered: AvatarVariantProps['isBordered']
  disableAnimation: AvatarVariantProps['disableAnimation']
}>

export const [injectAvatarGroupContext, providerAvatarGroupContext] = createContext<AvatarGroupContext>('AvatarGroup')
