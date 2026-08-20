import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProjectForm } from './ProjectForm'

const renderForm = (onSubmitForm = vi.fn()) => {
  render(
    <>
      <ProjectForm formId="test-form" onSubmitForm={onSubmitForm} />
      <button type="submit" form="test-form">
        Save
      </button>
    </>,
  )

  return { onSubmitForm, user: userEvent.setup() }
}

describe('ProjectForm', () => {
  it('blocks submission and reports a missing name', async () => {
    const { onSubmitForm, user } = renderForm()

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(onSubmitForm).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true')
  })

  it('rejects a name shorter than three characters', async () => {
    const { onSubmitForm, user } = renderForm()

    await user.type(screen.getByLabelText('Name'), 'ab')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Name must be at least 3 characters')).toBeInTheDocument()
    expect(onSubmitForm).not.toHaveBeenCalled()
  })

  it('submits the entered values', async () => {
    const { onSubmitForm, user } = renderForm()

    await user.type(screen.getByLabelText('Name'), 'Landing')
    await user.type(screen.getByLabelText('Description'), 'Spring launch')
    await user.selectOptions(screen.getByLabelText('Status'), 'done')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmitForm).toHaveBeenCalledTimes(1)
    expect(onSubmitForm.mock.calls[0][0]).toEqual({
      name: 'Landing',
      description: 'Spring launch',
      status: 'done',
    })
  })
})
