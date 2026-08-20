import { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useClickOutside } from './useClickOutside'

const Box = ({ onOutside }: { onOutside: () => void }) => {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onOutside)

  return (
    <div>
      <div ref={ref} data-testid="inside">
        <button type="button">Inner button</button>
      </div>
      <button type="button">Outside button</button>
    </div>
  )
}

describe('useClickOutside', () => {
  it('fires when the click lands outside the ref', async () => {
    const onOutside = vi.fn()
    const user = userEvent.setup()
    render(<Box onOutside={onOutside} />)

    await user.click(screen.getByRole('button', { name: 'Outside button' }))

    expect(onOutside).toHaveBeenCalledTimes(1)
  })

  it('ignores clicks inside the ref, including nested elements', async () => {
    const onOutside = vi.fn()
    const user = userEvent.setup()
    render(<Box onOutside={onOutside} />)

    await user.click(screen.getByTestId('inside'))
    await user.click(screen.getByRole('button', { name: 'Inner button' }))

    expect(onOutside).not.toHaveBeenCalled()
  })

  it('stops listening once unmounted', async () => {
    const onOutside = vi.fn()
    const user = userEvent.setup()
    const { unmount } = render(<Box onOutside={onOutside} />)

    unmount()
    await user.click(document.body)

    expect(onOutside).not.toHaveBeenCalled()
  })
})
