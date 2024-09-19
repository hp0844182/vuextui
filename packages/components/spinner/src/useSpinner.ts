// import type { ComputedRef } from 'vue'
// import { computed, ref } from 'vue'
// import type { SlotsToClasses, SpinnerSlots, SpinnerVariantProps } from '@vue-nextui/theme'
// import { spinner } from '@vue-nextui/theme'
// // import { clsx, objectToDeps } from '@nextui-org/shared-utils'

// interface Props extends HTMLNextUIProps<'div'> {
//   /**
//    * Spinner标签，如果传递将用作`aria-label`。
//    */
//   label?: string
//   /**
//    * 类名或类列表，用于更改元素的类名。
//    * 如果传递了`className`，它将被添加到基础插槽。
//    *
//    * @example
//    * ```ts
//    * <Spinner :class="{
//    *    base: 'base-classes',
//    *    wrapper: 'wrapper-classes',
//    *    circle1: 'circle1-classes',
//    *    circle2: 'circle2-classes',
//    *    label: 'label-classes'
//    * }" />
//    * ```
//    */
//   class?: SlotsToClasses<SpinnerSlots>
// }

// export type UseSpinnerProps = Props & SpinnerVariantProps

// export function useSpinner(props: UseSpinnerProps) {
//   const { children, class: className, label: labelProp, ...otherProps } = mappedProps

//   const slots = computed(() => spinner({ ...variantProps }))

//   const baseStyles = computed(() => clsx(props.class?.base, className))

//   const label = ref(labelProp || children)

//   const ariaLabel = computed(() => {
//     if (label.value && typeof label.value === 'string') {
//       return label.value
//     }

//     return !otherProps['aria-label'] ? '加载中' : ''
//   })

//   const getSpinnerProps: ComputedRef<PropGetter> = computed(() => () => ({
//     'aria-label': ariaLabel.value,
//     'class': slots.value.base({
//       class: baseStyles.value,
//     }),
//     ...otherProps,
//   }))

//   return { label, slots, class: props.class, getSpinnerProps }
// }

// export type UseSpinnerReturn = ReturnType<typeof useSpinner>
