import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

const renderModal = (isOpen = true) => {
  const onClose = vi.fn()

  const view = render(
    <Modal isOpen={isOpen} title="Delete project" onClose={onClose}>
      <p>Are you sure?</p>
    </Modal>,
  )

  return { onClose, user: userEvent.setup(), ...view }
}

describe('Modal', () => {
  it('renders nothing while closed', () => {
    renderModal(false)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('exposes a labelled modal dialog', () => {
    renderModal()

    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAccessibleName('Delete project')
  })

  it('closes on Escape', async () => {
    const { onClose, user } = renderModal()

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes from the close button', async () => {
    const { onClose, user } = renderModal()

    await user.click(screen.getByRole('button', { name: 'Close dialog' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks body scroll while open and restores it on close', () => {
    const { rerender } = renderModal()

    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <Modal isOpen={false} title="Delete project" onClose={vi.fn()}>
        <p>Are you sure?</p>
      </Modal>,
    )

    expect(document.body.style.overflow).toBe('')
  })
})
