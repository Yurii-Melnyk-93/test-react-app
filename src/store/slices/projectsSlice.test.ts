import { describe, expect, it } from 'vitest'
import projectsReducer, {
  addProject,
  deleteProject,
  updateProject,
  type ProjectsState,
} from './projectsSlice'
import type { Project } from '@/types/Project'

const existingProject: Project = {
  id: 'p1',
  name: 'CRM System',
  description: 'Sales dashboard',
  status: 'todo',
  createdAt: '2024-01-01T00:00:00.000Z',
}

const stateWith = (...items: Project[]): ProjectsState => ({ items })

describe('projectsSlice', () => {
  it('adds a project with a generated id and timestamp', () => {
    const state = projectsReducer(
      stateWith(),
      addProject({ name: 'Landing', description: '', status: 'in_progress' }),
    )

    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toMatchObject({
      name: 'Landing',
      description: '',
      status: 'in_progress',
    })
    expect(state.items[0].id).toEqual(expect.any(String))
    expect(Number.isNaN(Date.parse(state.items[0].createdAt))).toBe(false)
  })

  it('puts the newest project first', () => {
    const state = projectsReducer(
      stateWith(existingProject),
      addProject({ name: 'Landing', description: '', status: 'todo' }),
    )

    expect(state.items.map((project) => project.name)).toEqual(['Landing', 'CRM System'])
  })

  it('updates only the editable fields of the matching project', () => {
    const state = projectsReducer(
      stateWith(existingProject),
      updateProject({
        id: 'p1',
        values: { name: 'CRM v2', description: 'Rewritten', status: 'done' },
      }),
    )

    expect(state.items[0]).toEqual({
      id: 'p1',
      name: 'CRM v2',
      description: 'Rewritten',
      status: 'done',
      createdAt: existingProject.createdAt,
    })
  })

  it('ignores an update for an unknown id', () => {
    const state = projectsReducer(
      stateWith(existingProject),
      updateProject({ id: 'missing', values: { name: 'x', description: '', status: 'done' } }),
    )

    expect(state.items).toEqual([existingProject])
  })

  it('deletes a project by id', () => {
    const state = projectsReducer(stateWith(existingProject), deleteProject('p1'))

    expect(state.items).toEqual([])
  })
})
