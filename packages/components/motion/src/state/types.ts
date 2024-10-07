import type { DOMKeyframesDefinition, DynamicAnimationOptions, animate } from 'framer-motion'

type AnimationPlaybackControls = ReturnType<typeof animate>

export interface Variant extends DOMKeyframesDefinition {
  transition?: DynamicAnimationOptions
}

export interface Options {
  initial?: string | Variant | boolean
  animate?: string | Variant
  exit?: string | Variant
  variants?: {
    [k: string]: Variant
  }
  transition?: DynamicAnimationOptions
}

export interface MotionState {
  update: (options: Options) => void
  getDepth: () => number
  getTarget: () => DOMKeyframesDefinition
  getOptions: () => Options
  getContext: () => MotionStateContext
  setActive: (type: keyof MotionStateContext, isActive: boolean) => void
  mount: (element: Element) => () => void
  isMounted: () => boolean
  animateUpdates: () => Generator<void>
}

export interface MotionStateContext {
  initial?: string
  animate?: string
  inView?: string
  hover?: string
  press?: string
  exit?: string
}

export type AnimationFactory = () => AnimationPlaybackControls | undefined

export interface CssPropertyDefinition {
  syntax: `<${string}>`
  initialValue: string | number
  toDefaultUnit: (v: number) => string | number
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition }
