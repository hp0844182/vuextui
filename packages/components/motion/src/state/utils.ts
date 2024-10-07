import type { DynamicAnimationOptions } from 'framer-motion'
import type { Options, Variant } from './types'
import type { VNode } from 'vue'

export function resolveVariant(
  definition?: Options['initial'],
  variants?: Options['variants'],
): Variant | undefined {
  if (typeof definition === 'object') {
    return definition
  }
  else if (definition && variants) {
    return variants[definition as string] as Variant
  }
}

export function hasChanged(a: any, b: any): boolean {
  if (typeof a !== typeof b)
    return true
  if (Array.isArray(a) && Array.isArray(b))
    return !shallowCompare(a, b)
  return a !== b
}

export function shallowCompare(next: any[], prev: any[]) {
  const prevLength = prev.length

  if (prevLength !== next.length)
    return false

  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false
  }

  return true
}

export function addUniqueItem<T>(array: T[], item: T) {
  // eslint-disable-next-line ts/no-unused-expressions
  !array.includes(item) && array.push(item)
}

export function removeItem<T>(array: T[], item: T) {
  const index = array.indexOf(item)
  // eslint-disable-next-line ts/no-unused-expressions
  index !== -1 && array.splice(index, 1)
}

export function getOptions(options: DynamicAnimationOptions, key: string): DynamicAnimationOptions {
  return options[key as any] ? { ...options, ...options[key as any] } : { ...options }
}

export const isCssVar = (name: string) => name.startsWith('--')

export function noop() {}
export const noopReturn = <V>(v: V) => v

export function isNumber(value: any): boolean {
  return typeof value === 'number'
}

export function isElement(vNode: VNode) {
  return typeof vNode.type !== 'symbol'
}

export function getChildKey(vNode: VNode) {
  return vNode.key
}
