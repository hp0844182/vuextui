// useHover.spec.js
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref, toRefs } from 'vue'
import { fireEvent, render, screen } from '@testing-library/vue'

import { useHover } from './useHover'

describe('useHover', () => {
  it('当isDisabled为true时，不触发悬停事件', async () => {
    const onHoverStart = vi.fn()
    const onHoverEnd = vi.fn()

    const TestComponentWithDisabled = defineComponent({
      setup() {
        const { isHovered, hoverProps } = useHover({ onHoverStart, onHoverEnd, isDisabled: ref(true) })
        return () => h('div', { ...hoverProps, role: 'basic' }, isHovered.value ? 'Hovered' : 'Not Hovered')
      },
    })

    const wrapper = render(TestComponentWithDisabled).getByRole('basic')

    await fireEvent.mouseEnter(wrapper)
    expect(onHoverStart).not.toHaveBeenCalled()

    await fireEvent.mouseLeave(wrapper)
    expect(onHoverEnd).not.toHaveBeenCalled()
  })

  describe('pointer events', () => {
    beforeAll(() => {
      // 模拟 PointerEvent
      vi.stubGlobal('PointerEvent', class a extends Event {
        pointerId: number
        pointerType: string
        constructor(type: string, params: any = {}) {
          super(type, params)
          this.pointerId = params.pointerId || 0
          this.pointerType = params.pointerType || 'mouse'
        }
      })
    })
    afterAll(() => {
      // 清理模拟
      vi.unstubAllGlobals()
    })

    it('应该根据指针事件触发悬停事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponentWithPointerEvents = defineComponent({
        setup() {
          const { isHovered, hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, role: 'basic' }, isHovered.value ? 'Hovered' : 'Not Hovered')
        },
      })

      const wrapper = render(TestComponentWithPointerEvents).getByRole('basic')
      await fireEvent.pointerEnter(screen.queryByRole('basic')!, {
        pointerType: 'mouse',
      })
      await fireEvent.pointerLeave(wrapper, {
        pointerType: 'mouse',
      })
      expect(events).toEqual([
        { type: 'hoverstart', pointerType: 'mouse', target: wrapper },
        {
          type: 'hoverchange',
          isHovering: true,
        },
        { type: 'hoverend', pointerType: 'mouse', target: wrapper },
        {
          type: 'hoverchange',
          isHovering: false,
        },
      ])
    })

    it('当pointerType为touch时不应触发悬停事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponentWithTouch = defineComponent({
        setup() {
          const { hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, role: 'basic' }, 'test')
        },
      })

      const wrapper = render(TestComponentWithTouch).getByRole('basic')
      await fireEvent.pointerEnter(wrapper, {
        pointerType: 'touch',
      })
      await fireEvent.pointerLeave(wrapper, {
        pointerType: 'touch',
      })

      expect(events).toEqual([])
    })

    it('忽略触摸事件后的模拟鼠标事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponent = defineComponent({
        setup() {
          const { hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'root',
          }, 'test')
        },
      })

      const wrapper = render(TestComponent)
      const root = wrapper.getByTestId('root')
      await fireEvent.pointerDown(root, {
        pointerType: 'touch',
      })
      await fireEvent.pointerOver(root, {
        pointerType: 'touch',
      })
      await fireEvent.pointerOut(root, {
        pointerType: 'touch',
      })
      await fireEvent.pointerUp(root, {
        pointerType: 'touch',
      })
      // // Safari在iOS上有一个bug，在聚焦时会触发pointerType为"mouse"的指针事件。
      // // 参见 https://bugs.webkit.org/show_bug.cgi?id=214609
      await fireEvent.pointerEnter(root, {
        pointerType: 'mouse',
      })
      await fireEvent.pointerLeave(root, {
        pointerType: 'mouse',
      })

      expect(events).toEqual([])
    })

    it('在延迟后支持触摸事件后的鼠标事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => {
        events.push(e)
      }
      const TestComponentWithDisabled = defineComponent({
        setup() {
          const { hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'root', 'role': 'basic' }, 'test')
        },
      })

      const wrapper = render(TestComponentWithDisabled)
      const root = wrapper.getByTestId('root')
      await fireEvent.pointerDown(root, { pointerType: 'touch' })
      await fireEvent.pointerOver(root, { pointerType: 'touch' })
      await fireEvent.pointerOut(root, { pointerType: 'touch' })
      await fireEvent.pointerUp(root, { pointerType: 'touch' })
      await new Promise(resolve => setTimeout(resolve, 100))
      // Safari on iOS has a bug that fires a pointer event with pointerType="mouse" on focus.
      // See https://bugs.webkit.org/show_bug.cgi?id=214609.
      await fireEvent.pointerEnter(root, { pointerType: 'mouse' })
      await fireEvent.pointerLeave(root, { pointerType: 'mouse' })
      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: root,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: true,
        },
        {
          type: 'hoverend',
          target: root,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: false,
        },
      ])
    })

    it('应该通过指针事件视觉上改变组件', async () => {
      const TestComponent = defineComponent({
        setup() {
          const { isHovered, hoverProps } = useHover({
            onHoverChange: (isHovering) => {
              console.log('isHovering:', isHovering)
            },
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, isHovered.value ? 'test-hovered' : 'test')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')
      await fireEvent.pointerEnter(el, { pointerType: 'mouse' })

      expect(el.textContent).toBe('test-hovered')

      await fireEvent.pointerLeave(el, { pointerType: 'mouse' })
      expect(el.textContent).toBe('test')
    })

    it('当pointerType为touch时不应该视觉上改变组件', async () => {
      const TestComponent = defineComponent({
        setup() {
          const { isHovered, hoverProps } = useHover({})
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, isHovered.value ? 'test-hovered' : 'test')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')

      await fireEvent.pointerEnter(el, { pointerType: 'touch' })
      expect(el.textContent).toBe('test')

      await fireEvent.pointerLeave(el, { pointerType: 'touch' })
      expect(el.textContent).toBe('test')
    })

    it('当禁用时应结束悬停状态', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)

      const TestComponent = defineComponent({
        props: {
          isDisabled: Boolean,
        },
        setup(props) {
          const { isDisabled } = toRefs(props)
          const { isHovered, hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
            isDisabled,
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, isHovered.value ? 'test-hovered' : 'test')
        },
      })

      const { getByTestId, rerender } = render(TestComponent)
      const el = getByTestId('test')

      await fireEvent.pointerEnter(el, { pointerType: 'mouse' })

      expect(el.textContent).toBe('test-hovered')
      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: true,
        },
      ])

      await fireEvent.pointerLeave(el, { pointerType: 'mouse' })

      events.length = 0

      await rerender({ isDisabled: true })
      expect(el.textContent).toBe('test')
      expect(events).toEqual([])
    })
  })

  describe('鼠标事件', () => {
    it('应根据鼠标事件触发悬停事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponent = defineComponent({
        setup() {
          const { isHovered, hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, isHovered.value ? 'test-hovered' : 'test')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')
      await fireEvent.mouseEnter(el)
      await fireEvent.mouseLeave(el)

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: true,
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: false,
        },
      ])
    })

    it('应根据鼠标事件视觉上改变组件', async () => {
      const TestComponent = defineComponent({
        setup() {
          const { isHovered, hoverProps } = useHover({})
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, isHovered.value ? 'test-hovered' : 'test')
        },
      })
      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')

      await fireEvent.mouseEnter(el)
      expect(el.textContent).toBe('test-hovered')

      await fireEvent.mouseLeave(el)
      expect(el.textContent).toBe('test')
    })

    it('忽略触摸事件后的模拟鼠标事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponent = defineComponent({
        setup() {
          const { hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, 'test')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')
      await fireEvent.touchStart(el)
      await fireEvent.mouseEnter(el)
      await fireEvent.mouseLeave(el)
      await fireEvent.touchEnd(el)

      // Safari在iOS上有一个bug，在focus时会触发鼠标事件。
      // 参见 https://bugs.webkit.org/show_bug.cgi?id=214609。
      await fireEvent.mouseEnter(el)
      await fireEvent.mouseLeave(el)

      expect(events).toEqual([])
    })

    it('在延迟后支持触摸事件后的鼠标事件', async () => {
      vi.useFakeTimers()
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponent = defineComponent({
        setup() {
          const { hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps.value, 'data-testid': 'test' }, 'test')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')
      await fireEvent.touchStart(el)
      await fireEvent.mouseEnter(el)
      await fireEvent.mouseLeave(el)
      await fireEvent.touchEnd(el)

      vi.advanceTimersByTime(100)

      // Safari在iOS上有一个bug，在focus时会触发鼠标事件。
      // 参见 https://bugs.webkit.org/show_bug.cgi?id=214609。
      await fireEvent.mouseEnter(el)
      await fireEvent.mouseLeave(el)

      expect(events).toEqual([
        {
          type: 'hoverstart',
          target: el,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: true,
        },
        {
          type: 'hoverend',
          target: el,
          pointerType: 'mouse',
        },
        {
          type: 'hoverchange',
          isHovering: false,
        },
      ])
      vi.useRealTimers()
    })
  })

  describe('触摸事件', () => {
    it('不应基于触摸事件触发悬停事件', async () => {
      const events: any[] = []
      const addEvent = (e: any) => events.push(e)
      const TestComponent = defineComponent({
        setup() {
          const { hoverProps } = useHover({
            onHoverStart: addEvent,
            onHoverEnd: addEvent,
            onHoverChange: isHovering => addEvent({ type: 'hoverchange', isHovering }),
          })
          return () => h('div', { ...hoverProps, 'data-testid': 'test' }, 'test')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')
      await fireEvent.touchStart(el)
      await fireEvent.touchMove(el)
      await fireEvent.touchEnd(el)
      await fireEvent.mouseEnter(el)
      await fireEvent.mouseLeave(el)

      expect(events).toEqual([])
    })

    it('不应通过触摸事件视觉上改变组件', async () => {
      const TestComponent = defineComponent({
        setup() {
          const { isHovered, hoverProps } = useHover({})
          return () => h('div', { ...hoverProps, 'data-testid': 'test' }, isHovered.value ? 'Hovered' : 'Not Hovered')
        },
      })

      const { getByTestId } = render(TestComponent)
      const el = getByTestId('test')

      await fireEvent.touchStart(el)
      expect(el.textContent).toBe('Not Hovered')

      await fireEvent.touchMove(el)
      expect(el.textContent).toBe('Not Hovered')

      await fireEvent.touchEnd(el)
      expect(el.textContent).toBe('Not Hovered')

      await fireEvent.mouseEnter(el)
      expect(el.textContent).toBe('Not Hovered')

      await fireEvent.mouseLeave(el)
      expect(el.textContent).toBe('Not Hovered')
    })
  })
})
