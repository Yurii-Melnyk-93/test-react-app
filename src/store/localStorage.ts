import { isProjectStatus, type Project } from '@/types/Project'

const STORAGE_KEY = 'react-course.projects'

const SEED_PROJECTS: Project[] = [
  {
    id: 'seed-crm',
    name: 'CRM System',
    description: 'Customer relationship management dashboard for the sales team.',
    status: 'in_progress',
    createdAt: '2024-03-11T09:00:00.000Z',
  },
  {
    id: 'seed-landing',
    name: 'Marketing Landing',
    description: 'One-page site for the spring product launch.',
    status: 'done',
    createdAt: '2024-01-22T09:00:00.000Z',
  },
  {
    id: 'seed-erp',
    name: 'ERP Integration',
    description: 'Sync inventory and invoices with the ERP backend.',
    status: 'todo',
    createdAt: '2024-05-02T09:00:00.000Z',
  },
]

/**
 * Data from localStorage is untrusted — it may come from an older version of
 * the app or from a user editing devtools, so every field is checked.
 */
const isProject = (value: unknown): value is Project => {
  if (typeof value !== 'object' || value === null) return false

  const project = value as Record<string, unknown>

  return (
    typeof project.id === 'string' &&
    typeof project.name === 'string' &&
    typeof project.description === 'string' &&
    typeof project.createdAt === 'string' &&
    isProjectStatus(project.status)
  )
}

export const loadProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) return SEED_PROJECTS

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return SEED_PROJECTS

    return parsed.filter(isProject)
  } catch {
    // Private mode, quota errors or malformed JSON — fall back to the seed.
    return SEED_PROJECTS
  }
}

export const saveProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    // Persisting is a nice-to-have; the app stays usable without it.
  }
}
