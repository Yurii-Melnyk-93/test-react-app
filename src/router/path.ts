export const PATHS = {
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  NOT_FOUND: '*',
} as const

export const projectDetailPath = (id: string) => `/projects/${id}`
