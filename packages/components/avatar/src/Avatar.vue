<script setup lang="ts">
import type { AvatarSlots, AvatarVariantProps, SlotsToClasses } from '@vue-nextui/theme'
import { avatar } from '@vue-nextui/theme'
import type { PrimitiveProps } from 'radix-vue'
import type { IntrinsicElementAttributes } from 'vue'
import { computed, mergeProps, ref, useAttrs, useSlots } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import AvatarIcon from './AvatarIcon.vue'
import { safeText } from './utils'
import { dataAttr, isDef, useFocusRing, useHover } from '@vue-nextui/shared'
import type { ImageLoadingStatus } from 'radix-vue/dist/Avatar/utils'
import { injectAvatarGroupContext } from './contex'

export interface AvatarProps extends PrimitiveProps, /* @vue-ignore */ AvatarVariantProps {
  src?: string
  name?: string
  alt?: string
  showFallback?: boolean
  classNames?: SlotsToClasses<AvatarSlots>
  getInitials?: (name: string) => string
  imgComponent?: keyof IntrinsicElementAttributes
  isFocusable?: boolean
  imgProps?: IntrinsicElementAttributes['img']
  isDisabled?: AvatarVariantProps['isBordered']
  isBordered?: AvatarVariantProps['isBordered']
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  getInitials: safeText,
  alt: (props) => {
    return props.name || 'avatar'
  },
  imgComponent: 'img',
  as: 'span',
  isBordered: undefined,
  isDisabled: undefined,
})

const attrs = useAttrs() as AvatarVariantProps
const avatarGroupContext = injectAvatarGroupContext(null)

const clsSlots = computed(() => {
  return avatar({
    color: isDef(attrs.color) ? attrs.color : avatarGroupContext?.value.color,
    size: isDef(attrs.size) ? attrs.size : avatarGroupContext?.value.size,
    radius: isDef(attrs.radius) ? attrs.radius : avatarGroupContext?.value.radius,
    isDisabled: isDef(props.isDisabled) ? props.isDisabled : avatarGroupContext?.value.isDisabled,
    isBordered: isDef(props.isBordered) ? props.isBordered : avatarGroupContext?.value.isBordered,
    isInGroup: !!avatarGroupContext?.value,
    isInGridGroup: avatarGroupContext?.value.isGrid,
    disableAnimation: isDef(attrs.disableAnimation) ? attrs.disableAnimation : avatarGroupContext?.value.disableAnimation,
  })
})

const { focusProps, isFocused, isFocusVisible } = useFocusRing()
const { hoverProps, isHovered } = useHover({
  // @ts-ignore
  isDisabled: computed(() => {
    return props.isDisabled || avatarGroupContext?.value.isDisabled
  }),
})

const canBeFocused = computed(() => {
  return props.isFocusable || props.as === 'button'
})

const avatarProps = computed(() => {
  return {
    'as': props.as,
    'data-slot': 'base',
    'tabIndex': canBeFocused.value ? 0 : -1,
    'data-hover': dataAttr(isHovered.value),
    'data-focus': dataAttr(canBeFocused.value && isFocused.value),
    'data-focus-visible': dataAttr(canBeFocused.value && isFocusVisible.value),
    ...mergeProps(hoverProps.value, canBeFocused.value ? focusProps : {}),
  }
})
const slots = useSlots()
const loadingStatus = ref<ImageLoadingStatus>('idle')
function handleLoadingStatusChange(value: ImageLoadingStatus) {
  loadingStatus.value = value
}
const imageProps = computed(() => {
  return {
    'src': props.src!,
    'as': props.imgComponent,
    'asChild': !!slots.image,
    'alt': props.alt,
    'data-slot': 'image',
    'data-loaded': dataAttr(loadingStatus.value === 'loaded'),
    'class': clsSlots.value.img({ class: props.classNames?.img }),
    ...props.imgProps,
  }
})

/**
 * Fallback avatar applies under 2 conditions:
 * - If `src` was passed and the image has not loaded or failed to load
 * - If `src` wasn't passed
 *
 * In this case, we'll show either the name avatar or default avatar
 */
const showFallback = computed(() => (!props.src || loadingStatus.value !== 'loaded') && props.showFallback)
</script>

<template>
  <AvatarRoot v-bind="avatarProps" :class="clsSlots.base({ className: [classNames?.base, props.class] })" @focus="focusProps.onFocus">
    <AvatarImage v-bind="imageProps" @loading-status-change="handleLoadingStatusChange">
      <slot name="image" />
    </AvatarImage>
    <template v-if="!(!showFallback && src)">
      <AvatarFallback v-if="$slots.fallback" data-slot="fallback" :class="clsSlots.fallback({ className: classNames?.fallback })" as="div" role="img">
        <slot name="fallback" />
      </AvatarFallback>
      <AvatarFallback v-else :class="name ? clsSlots.name({ className: classNames?.name }) : clsSlots.icon({ className: classNames?.icon })" :data-slot="name ? 'name' : 'icon'" as="span" role="img">
        <template v-if="name">
          {{ getInitials(name) }}
        </template>
        <slot v-else name="icon">
          <AvatarIcon />
        </slot>
      </AvatarFallback>
    </template>
  </AvatarRoot>
</template>
