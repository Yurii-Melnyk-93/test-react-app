import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PATHS } from './path'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectPage } from '@/pages/ProjectPage'
import { DefaultLayout } from '@/layouts/DefaultLayout'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={PATHS.HOME} element={<Navigate to={PATHS.PROJECTS} replace />} />
          <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
          <Route path={PATHS.PROJECT_DETAIL} element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}