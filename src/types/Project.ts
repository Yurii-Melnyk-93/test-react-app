export const PROJECT_STATUSES = ['todo', 'in_progress', 'done'] as const

export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
}

export type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  /** ISO date string, set by the store when the project is created. */
  createdAt: string
}

/** The fields a user fills in — `id` and `createdAt` are generated. */
export type ProjectFormValues = Pick<Project, 'name' | 'description' | 'status'>

export const isProjectStatus = (value: unknown): value is ProjectStatus =>
  PROJECT_STATUSES.includes(value as ProjectStatus)
