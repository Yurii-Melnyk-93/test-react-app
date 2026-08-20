import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadProjects, saveProjects } from './localStorage'
import type { Project } from '@/types/Project'

const STORAGE_KEY = 'react-course.projects'

const project: Project = {
  id: 'p1',
  name: 'CRM System',
  description: 'Sales dashboard',
  status: 'in_progress',
  createdAt: '2024-03-01T00:00:00.000Z',
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('loadProjects', () => {
  it('seeds the store when nothing is persisted yet', () => {
    const loaded = loadProjects()

    expect(loaded.length).toBeGreaterThan(0)
    expect(loaded.map((item) => item.id)).toContain('seed-crm')
  })

  it('returns what was persisted', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([project]))

    expect(loadProjects()).toEqual([project])
  })

  it('returns an empty list when the user deleted everything', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))

    expect(loadProjects()).toEqual([])
  })

  it('drops entries that do not look like projects', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([project, { id: 'p2' }, { ...project, id: 'p3', status: 'archived' }, null]),
    )

    expect(loadProjects()).toEqual([project])
  })

  it('falls back to the seed when the payload is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: [project] }))

    expect(loadProjects().map((item) => item.id)).toContain('seed-crm')
  })

  it('falls back to the seed on malformed json', () => {
    localStorage.setItem(STORAGE_KEY, '{ not json')

    expect(loadProjects().map((item) => item.id)).toContain('seed-crm')
  })

  it('falls back to the seed when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })

    expect(loadProjects().map((item) => item.id)).toContain('seed-crm')
  })
})

describe('saveProjects', () => {
  it('writes the projects under the storage key', () => {
    saveProjects([project])

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) as string)).toEqual([project])
  })

  it('swallows quota errors so the app keeps working', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => saveProjects([project])).not.toThrow()
  })
})
