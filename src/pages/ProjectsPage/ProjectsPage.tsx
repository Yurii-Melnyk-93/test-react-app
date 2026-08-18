import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, EmptyState, StatusBadge, Table } from '@/components/ui'
import { ProjectFormModal } from '@/components/projects/ProjectFormModal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectProjects } from '@/store/selectors/projectSelectors'
import { addProject } from '@/store/slices/projectsSlice'
import { PATHS } from '@/router'
import type { Column } from '@/types/Table'
import type { Project, ProjectFormValues } from '@/types/Project'
import { formatDate } from '@/utils/formatDate'
import styles from './ProjectsPage.module.scss'

// Defined outside the component so the array identity stays stable.
const columns: Column<Project>[] = [
  {
    key: 'name',
    title: 'Name',
    render: (project) => <span className={styles.name}>{project.name}</span>,
  },
  {
    key: 'description',
    title: 'Description',
    render: (project) => (
      <span className={styles.description}>{project.description || '—'}</span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (project) => <StatusBadge status={project.status} />,
  },
  {
    key: 'createdAt',
    title: 'Created',
    render: (project) => formatDate(project.createdAt),
  },
]

export const ProjectsPage = () => {
  const projects = useAppSelector(selectProjects)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleCreate = (values: ProjectFormValues) => {
    dispatch(addProject(values))
    setIsFormOpen(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>+ New project</Button>
      </div>

      <Table
        items={projects}
        columns={columns}
        caption="List of projects"
        getRowKey={(project) => project.id}
        onRowClick={(project) => navigate(`${PATHS.PROJECTS}/${project.id}`)}
        emptyState={
          <EmptyState
            title="No projects yet"
            description="Create your first project to get started."
            action={<Button onClick={() => setIsFormOpen(true)}>+ New project</Button>}
          />
        }
      />

      <ProjectFormModal
        isOpen={isFormOpen}
        onSubmit={handleCreate}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  )
}
