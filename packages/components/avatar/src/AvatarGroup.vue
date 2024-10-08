<script setup lang="ts">
import { type AvatarGroupSlots, type AvatarGroupVariantProps, type AvatarVariantProps, type SlotsToClasses, avatarGroup } from '@vue-nextui/theme'
import type { PrimitiveProps } from 'radix-vue'
import { Primitive } from 'radix-vue'
import { cloneVNode, computed, useSlots } from 'vue'
import { providerAvatarGroupContext } from './contex'
import Avatar from './Avatar.vue'

export interface AvatarGroupProps extends PrimitiveProps {
  isGrid?: AvatarGroupVariantProps['isGrid']
  size?: AvatarVariantProps['size']
  color?: AvatarVariantProps['color']
  radius?: AvatarVariantProps['radius']
  isDisabled?: AvatarVariantProps['isDisabled']
  isBordered?: AvatarVariantProps['isBordered']
  disableAnimation?: AvatarVariantProps['disableAnimation']
  max?: number
  total?: number
  classNames?: SlotsToClasses<AvatarGroupSlots>
  class?: string
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  isGrid: false,
  color: 'default',
  radius: 'full',
  isDisabled: false,
  isBordered: false,
  max: 5,
  as: 'div',
  asChild: false,
})

providerAvatarGroupContext(computed(() => {
  return {
    isGrid: props.isGrid,
    size: props.size,
    color: props.color,
    radius: props.radius,
    isDisabled: props.isDisabled,
    isBordered: props.isBordered,
    disableAnimation: props.disableAnimation,
  }
}))

const clsSlots = computed(() => avatarGroup({ isGrid: props.isGrid }))

const slots = useSlots()

const validChildren = computed(() => {
  return slots.default?.()?.filter(child => !(child.type instanceof Symbol)) || []
})
const renderNodes = computed(() => {
  if (props.max) {
    return validChildren.value?.slice(0, props.max)
  }
  return validChildren.value
})

const remainingCount = computed(() => {
  return props.total ? props.total : props.max != null ? validChildren.value.length - props.max : -1
})
const clonedChild = computed(() => {
  return renderNodes.value.map((node, index) => {
    const isLastAvatar = index === renderNodes.value.length - 1
    return cloneVNode(node, {
      class: `${isLastAvatar && remainingCount.value < 1 ? 'hover:-translate-x-0' : ''}`,
    })
  })
})

const avatarGroupProps = computed(() => {
  return {
    'class': clsSlots.value.base({
      className: [props.classNames?.base, props.class],
    }),
    'role': 'group',
    'as': props.as,
    'asChild': props.asChild,
    'data-slot': 'base',
  }
})
</script>

<template>
  <Primitive
    v-bind="avatarGroupProps"
  >
    <component
      :is="{
        render: () => {
          return clonedChild
        },
      }"
    />
    <slot v-if="remainingCount > 0" name="count" :count="remainingCount">
      <Avatar :name="`+${remainingCount}`" :class="clsSlots.count({ className: classNames?.count })" />
    </slot>
  </Primitive>
</template>
