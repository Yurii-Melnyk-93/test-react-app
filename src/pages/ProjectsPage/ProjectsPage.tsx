import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ConfirmDialog, EmptyState, StatusBadge, Table } from '@/components/ui'
import { ProjectFormModal } from '@/components/projects/ProjectFormModal'
import { ProjectsToolbar, type StatusFilter } from '@/components/projects/ProjectsToolbar'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { selectProjects } from '@/store/selectors/projectSelectors'
import { addProject, deleteProject, updateProject } from '@/store/slices/projectsSlice'
import { projectDetailPath } from '@/router'
import type { Column } from '@/types/Table'
import { toFormValues, type Project, type ProjectFormValues } from '@/types/Project'
import { STATUS_FILTER_ALL, type SortOption } from '@/types/Sort'
import { formatDate } from '@/utils/formatDate'
import styles from './ProjectsPage.module.scss'

const sortProjects = (projects: Project[], sort: SortOption): Project[] => {
  // `toSorted` avoids mutating the array coming from the Redux store.
  switch (sort) {
    case 'oldest':
      return projects.toSorted((a, b) => a.createdAt.localeCompare(b.createdAt))
    case 'name':
      return projects.toSorted((a, b) => a.name.localeCompare(b.name))
    case 'newest':
    default:
      return projects.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
  }
}

export const ProjectsPage = () => {
  const projects = useAppSelector(selectProjects)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>(STATUS_FILTER_ALL)
  const [sort, setSort] = useState<SortOption>('newest')

  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const visibleProjects = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()

    const filtered = projects.filter((project) => {
      const matchesStatus = status === STATUS_FILTER_ALL || project.status === status
      const matchesQuery =
        query === '' ||
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)

      return matchesStatus && matchesQuery
    })

    return sortProjects(filtered, sort)
  }, [projects, debouncedSearch, status, sort])

  const openCreateForm = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  const openEditForm = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleSubmit = (values: ProjectFormValues) => {
    if (editingProject) {
      dispatch(updateProject({ id: editingProject.id, values }))
    } else {
      dispatch(addProject(values))
    }

    setIsFormOpen(false)
    setEditingProject(null)
  }

  const handleDelete = () => {
    if (projectToDelete) {
      dispatch(deleteProject(projectToDelete.id))
    }

    setProjectToDelete(null)
  }

  const columns = useMemo<Column<Project>[]>(
    () => [
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
      {
        key: 'actions',
        title: 'Actions',
        render: (project) => (
          // The row itself navigates, so the buttons must not bubble up to it.
          <div className={styles.actions} onClick={(event) => event.stopPropagation()}>
            <Button
              variant="secondary"
              onClick={() => openEditForm(project)}
              aria-label={`Edit ${project.name}`}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              onClick={() => setProjectToDelete(project)}
              aria-label={`Delete ${project.name}`}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const hasProjects = projects.length > 0

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            {visibleProjects.length} of {projects.length}{' '}
            {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
        <Button onClick={openCreateForm}>+ New project</Button>
      </div>

      {hasProjects && (
        <ProjectsToolbar
          search={search}
          status={status}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSortChange={setSort}
        />
      )}

      <Table
        items={visibleProjects}
        columns={columns}
        caption="List of projects"
        getRowKey={(project) => project.id}
        onRowClick={(project) => navigate(projectDetailPath(project.id))}
        emptyState={
          hasProjects ? (
            <EmptyState
              icon="🔍"
              title="No matching projects"
              description="Try a different search term or clear the status filter."
            />
          ) : (
            <EmptyState
              title="No projects yet"
              description="Create your first project to get started."
              action={<Button onClick={openCreateForm}>+ New project</Button>}
            />
          )
        }
      />

      <ProjectFormModal
        isOpen={isFormOpen}
        initialValues={editingProject ? toFormValues(editingProject) : undefined}
        onSubmit={handleSubmit}
        onClose={() => setIsFormOpen(false)}
      />

      <ConfirmDialog
        isOpen={projectToDelete !== null}
        title="Delete project"
        message={`"${projectToDelete?.name}" will be permanently removed. This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  )
}
