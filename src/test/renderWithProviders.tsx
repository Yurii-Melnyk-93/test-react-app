import type { ReactElement, ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import projectsReducer, { type ProjectsState } from '@/store/slices/projectsSlice'

type Options = {
  preloadedState?: { projects: ProjectsState }
  route?: string
}

/**
 * Renders a component inside a fresh store and router, so tests never share
 * state and can start on any route.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState, route = '/' }: Options = {},
) => {
  const store = configureStore({
    reducer: { projects: projectsReducer },
    preloadedState,
  })

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </Provider>
  )

  return { store, ...render(ui, { wrapper: Wrapper }) }
}
