import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ProjectsPage } from './ProjectsPage'
import { renderWithProviders } from '@/test/renderWithProviders'
import type { Project } from '@/types/Project'

const projects: Project[] = [
  {
    id: 'p1',
    name: 'CRM System',
    description: 'Sales dashboard',
    status: 'in_progress',
    createdAt: '2024-03-01T00:00:00.000Z',
  },
  {
    id: 'p2',
    name: 'Marketing Landing',
    description: 'Spring launch page',
    status: 'done',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
]

const renderPage = () =>
  renderWithProviders(<ProjectsPage />, {
    preloadedState: { projects: { items: projects } },
    route: '/projects',
  })

const rowNames = () =>
  within(screen.getByRole('table'))
    .getAllByRole('row')
    .slice(1) // drop the header row
    .map((row) => within(row).getAllByRole('cell')[0].textContent)

describe('ProjectsPage', () => {
  it('lists every project', () => {
    renderPage()

    expect(rowNames()).toEqual(['CRM System', 'Marketing Landing'])
  })

  it('filters by the debounced search query', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText('Search projects'), 'landing')

    expect(await screen.findByText('1 of 2 projects')).toBeInTheDocument()
    expect(rowNames()).toEqual(['Marketing Landing'])
  })

  it('filters by status', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.selectOptions(screen.getByLabelText('Status'), 'done')

    expect(rowNames()).toEqual(['Marketing Landing'])
  })

  it('sorts by name', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.selectOptions(screen.getByLabelText('Sort'), 'name')

    expect(rowNames()).toEqual(['CRM System', 'Marketing Landing'])
  })

  it('shows a distinct empty state when nothing matches', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText('Search projects'), 'nothing matches this')

    expect(await screen.findByText('No matching projects')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('removes a project after the delete confirmation', async () => {
    const user = userEvent.setup()
    const { store } = renderPage()

    await user.click(screen.getByRole('button', { name: 'Delete CRM System' }))
    await user.click(screen.getByRole('button', { name: /^Delete$/ }))

    expect(store.getState().projects.items.map((project) => project.id)).toEqual(['p2'])
  })
})
