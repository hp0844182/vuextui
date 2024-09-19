import { fireEvent, render } from '@testing-library/vue'
import { h, nextTick } from 'vue'
import { usePress } from '../usePress'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

function Example(props) {
  const { elementType = 'div', style, draggable, ...otherProps } = props
  const { pressProps } = usePress(otherProps)
  return h(elementType, {
    ...pressProps,
    style,
    tabindex: '0',
    draggable,
  }, elementType !== 'input' ? 'test' : undefined)
}

function pointerEvent(type, opts) {
  if (typeof PointerEvent !== 'undefined') {
    return new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      ...opts,
    })
  }
  else {
    const event = new Event(type, {
      bubbles: true,
      cancelable: true,
    })
    Object.assign(event, {
      pointerId: opts.pointerId,
      pointerType: opts.pointerType,
      clientX: opts.clientX,
      clientY: opts.clientY,
    })
    return event
  }
}

describe('usePress', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runAllTimers()
  })

  describe('指针事件', () => {
    it('应该根据指针事件触发按压事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const { getByText } = render(Example, {
        props: {
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressChange: pressed => addEvent({ type: 'presschange', pressed }),
          onPress: addEvent,
          onPressUp: addEvent,
        },
      })

      const el = getByText('test')
      fireEvent(el, pointerEvent('pointerdown', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))
      fireEvent(el, pointerEvent('pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))

      await nextTick()
      expect(events).toEqual([
        {
          type: 'pressstart',
          target: el,
          pointerType: 'mouse',
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
          altKey: false,
          x: 0,
          y: 0,
        },
        {
          type: 'presschange',
          pressed: true,
        },
        {
          type: 'pressup',
          target: el,
          pointerType: 'mouse',
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
          altKey: false,
          x: 0,
          y: 0,
        },
        {
          type: 'pressend',
          target: el,
          pointerType: 'mouse',
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
          altKey: false,
          x: 0,
          y: 0,
        },
        {
          type: 'presschange',
          pressed: false,
        },
        {
          type: 'press',
          target: el,
          pointerType: 'mouse',
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
          altKey: false,
          x: 0,
          y: 0,
        },
      ])
    })

    it('应该处理触摸事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const { getByText } = render(Example, {
        props: {
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressChange: pressed => addEvent({ type: 'presschange', pressed }),
          onPress: addEvent,
          onPressUp: addEvent,
        },
      })

      const el = getByText('test')
      fireEvent(el, pointerEvent('pointerdown', { pointerId: 1, pointerType: 'touch', clientX: 10, clientY: 20 }))
      fireEvent(el, pointerEvent('pointerup', { pointerId: 1, pointerType: 'touch', clientX: 10, clientY: 20 }))

      await nextTick()

      expect(events.length).toBe(6)
      expect(events[0].pointerType).toBe('touch')
      expect(events[0].x).toBe(10)
      expect(events[0].y).toBe(20)
    })

    it('应该处理取消事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const { getByText } = render(Example, {
        props: {
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressChange: pressed => addEvent({ type: 'presschange', pressed }),
        },
      })

      const el = getByText('test')
      fireEvent(el, pointerEvent('pointerdown', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))
      fireEvent(el, pointerEvent('pointercancel', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))

      await nextTick()
      expect(events.length).toBe(4)
      expect(events[2].type).toBe('pressend')
    })
  })

  describe('键盘事件', () => {
    it('应该处理Enter键事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const { getByText } = render(Example, {
        props: {
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressChange: pressed => addEvent({ type: 'presschange', pressed }),
          onPress: addEvent,
          onPressUp: addEvent,
        },
      })

      const el = getByText('test')
      fireEvent.keyDown(el, { key: 'Enter' })
      fireEvent.keyUp(el, { key: 'Enter' })

      await nextTick()

      expect(events.length).toBe(6)
      expect(events[0].pointerType).toBe('keyboard')
    })

    it('应该处理空格键事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const { getByText } = render(Example, {
        props: {
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressChange: pressed => addEvent({ type: 'presschange', pressed }),
          onPress: addEvent,
          onPressUp: addEvent,
        },
      })

      const el = getByText('test')
      fireEvent.keyDown(el, { key: ' ' })
      fireEvent.keyUp(el, { key: ' ' })

      await nextTick()

      expect(events.length).toBe(6)
      expect(events[0].pointerType).toBe('keyboard')
    })
  })

  describe('禁用状态', () => {
    it('当禁用时不应触发事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const { getByText } = render(Example, {
        props: {
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressChange: pressed => addEvent({ type: 'presschange', pressed }),
          onPress: addEvent,
          onPressUp: addEvent,
          isDisabled: true,
        },
      })

      const el = getByText('test')
      fireEvent(el, pointerEvent('pointerdown', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))
      fireEvent(el, pointerEvent('pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))

      await nextTick()

      expect(events.length).toBe(0)
    })
  })

  describe('isPressed状态', () => {
    it('应该正确反映按压状态', async () => {
      const pressedStates: boolean[] = []
      const { getByText } = render(Example, {
        props: {
          onPressChange: pressed => pressedStates.push(pressed),
        },
      })

      const el = getByText('test')
      fireEvent(el, pointerEvent('pointerdown', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))
      await nextTick()
      fireEvent(el, pointerEvent('pointerup', { pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0 }))
      await nextTick()

      expect(pressedStates).toEqual([true, false])
    })
  })
})
