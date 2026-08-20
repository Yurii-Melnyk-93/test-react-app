import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectPage } from '@/pages/ProjectPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PATHS } from './path'

export const Router = () => (
  // Vite's BASE_URL is '/' locally and the repository subpath on GitHub Pages,
  // so the same build works in both places.
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={PATHS.HOME} element={<Navigate to={PATHS.PROJECTS} replace />} />
        <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
        <Route path={PATHS.PROJECT_DETAIL} element={<ProjectPage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
