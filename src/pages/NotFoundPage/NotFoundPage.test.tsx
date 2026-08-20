import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NotFoundPage } from './NotFoundPage'
import { renderWithProviders } from '@/test/renderWithProviders'

describe('NotFoundPage', () => {
  it('renders the default not found copy', () => {
    renderWithProviders(<NotFoundPage />, { route: '/nowhere' })

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('accepts a caller supplied title and message', () => {
    renderWithProviders(<NotFoundPage title="Project not found" message="It was deleted." />, {
      route: '/nowhere',
    })

    expect(screen.getByRole('heading', { name: 'Project not found' })).toBeInTheDocument()
    expect(screen.getByText('It was deleted.')).toBeInTheDocument()
  })

  it('links back to the projects list', () => {
    renderWithProviders(<NotFoundPage />, { route: '/nowhere' })

    expect(screen.getByRole('link', { name: 'Go to projects' })).toHaveAttribute(
      'href',
      '/projects',
    )
  })
})
