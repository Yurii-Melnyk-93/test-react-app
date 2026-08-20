import { Route, Routes } from 'react-router-dom'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ProjectPage } from './ProjectPage'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { Project } from '@/types/Project'
import { formatDate } from '@/utils/formatDate'

const project: Project = {
  id: 'p1',
  name: 'CRM System',
  description: 'Sales dashboard',
  status: 'in_progress',
  createdAt: '2024-03-01T00:00:00.000Z',
}

const renderPage = (route = '/projects/p1') =>
  renderWithProviders(
    <Routes>
      <Route path="/projects" element={<h1>Projects list</h1>} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>,
    { preloadedState: { projects: { items: [project] } }, route },
  )

describe('ProjectPage', () => {
  it('shows the details of the project in the url', () => {
    renderPage()

    expect(screen.getByRole('heading', { name: 'CRM System' })).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
    expect(screen.getByText('Sales dashboard')).toBeInTheDocument()
    expect(screen.getByText('Created')).toBeInTheDocument()
    expect(screen.getByText(formatDate(project.createdAt))).toBeInTheDocument()
  })

  it('falls back to a placeholder when there is no description', () => {
    renderWithProviders(
      <Routes>
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>,
      {
        preloadedState: { projects: { items: [{ ...project, description: '' }] } },
        route: '/projects/p1',
      },
    )

    expect(screen.getByText('No description yet.')).toBeInTheDocument()
  })

  it('renders the 404 page for an unknown id', () => {
    renderPage('/projects/missing')

    expect(screen.getByRole('heading', { name: 'Project not found' })).toBeInTheDocument()
    expect(screen.getByText('This project does not exist or was deleted.')).toBeInTheDocument()
  })

  it('saves the edited values to the store', async () => {
    const user = userEvent.setup()
    const { store } = renderPage()

    await user.click(screen.getByRole('button', { name: 'Edit' }))

    const nameInput = screen.getByLabelText('Name')
    expect(nameInput).toHaveValue('CRM System')

    await user.clear(nameInput)
    await user.type(nameInput, 'CRM System v2')
    await user.selectOptions(screen.getByLabelText('Status'), 'done')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(store.getState().projects.items[0]).toMatchObject({
      id: 'p1',
      name: 'CRM System v2',
      status: 'done',
      createdAt: project.createdAt,
    })
    expect(screen.getByRole('heading', { name: 'CRM System v2' })).toBeInTheDocument()
  })

  it('deletes the project and returns to the list', async () => {
    const user = userEvent.setup()
    const { store } = renderPage()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    // The page action and the confirm button share a label, so scope the second
    // click to the dialog.
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Delete' }))

    expect(store.getState().projects.items).toEqual([])
    expect(screen.getByRole('heading', { name: 'Projects list' })).toBeInTheDocument()
  })

  it('keeps the project when the delete confirmation is cancelled', async () => {
    const user = userEvent.setup()
    const { store } = renderPage()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(store.getState().projects.items).toEqual([project])
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
