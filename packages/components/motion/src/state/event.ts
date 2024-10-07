import type { Variant } from './types'

export type MotionEventNames =
  | 'motionstart'
  | 'motioncomplete'
  | 'hoverstart'
  | 'hoverend'
  | 'pressstart'
  | 'pressend'
  | 'viewenter'
  | 'viewleave'

export function motionEvent(name: MotionEventNames, target: Variant) {
  return new CustomEvent(name, { detail: { target } })
}
