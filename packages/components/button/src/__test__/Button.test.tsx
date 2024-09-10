import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../'

describe('button', () => {
  it('should render correctly', () => {
    const wrapper = render(<Button disableRipple />)

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger onPress function', async () => {
    const onPress = vi.fn()
    const { getByRole } = render(<Button disableRipple onPress={onPress} />)

    await fireEvent.click(getByRole('button'))

    expect(onPress).toHaveBeenCalled()
  })

  it('should ignore events when disabled', async () => {
    const onPress = vi.fn()
    const { getByRole } = render(<Button disableRipple isDisabled={true} onPress={onPress} />)

    await fireEvent.click(getByRole('button'))

    expect(onPress).not.toHaveBeenCalled()
  })

  it('should renders with start icon', () => {
    const wrapper = render(
      <Button disableRipple>
        Button
      </Button>,
      {
        slots: {
          startContent: <span data-testid="start-icon">Icon</span>,
        },
      },
    )

    expect(wrapper.getByTestId('start-icon')).toBeInTheDocument()
  })

  it('should renders with end icon', () => {
    const wrapper = render(
      <Button disableRipple>
        Button
      </Button>,
      {
        slots: {
          endContent: <span data-testid="end-icon">Icon</span>,
        },
      },
    )

    expect(wrapper.getByTestId('end-icon')).toBeInTheDocument()
  })

  it('should have the proper type attribute', () => {
    const wrapper = render(<Button disableRipple type="submit" />)

    expect(wrapper.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
