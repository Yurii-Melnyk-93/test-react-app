import type { RootState } from '@/store'

export const selectProjects = (state: RootState) => state.projects.items

export const selectProjectById = (id: string | undefined) => (state: RootState) =>
  state.projects.items.find((project) => project.id === id)
