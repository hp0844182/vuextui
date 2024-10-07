import { createContext } from 'radix-vue'
import type { MotionState } from './state/types'

export const [injectMotion, provideMotion] = createContext<MotionState>('Motion')
