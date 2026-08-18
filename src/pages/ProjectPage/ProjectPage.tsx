import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, ConfirmDialog, StatusBadge } from '@/components/ui'
import { ProjectFormModal } from '@/components/projects/ProjectFormModal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectProjectById } from '@/store/selectors/projectSelectors'
import { deleteProject, updateProject } from '@/store/slices/projectsSlice'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PATHS } from '@/router'
import { toFormValues, type ProjectFormValues } from '@/types/Project'
import { formatDate } from '@/utils/formatDate'
import styles from './ProjectPage.module.scss'

export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>()
  const project = useAppSelector(selectProjectById(id))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // An unknown id is a wrong URL, not an error state — reuse the 404 page.
  if (!project) {
    return <NotFoundPage title="Project not found" message="This project does not exist or was deleted." />
  }

  const handleUpdate = (values: ProjectFormValues) => {
    dispatch(updateProject({ id: project.id, values }))
    setIsFormOpen(false)
  }

  const handleDelete = () => {
    dispatch(deleteProject(project.id))
    navigate(PATHS.PROJECTS)
  }

  return (
    <div className={styles.page}>
      <Link to={PATHS.PROJECTS} className={styles.back}>
        ← Back to projects
      </Link>

      <article className={styles.card}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>

          <div className={styles.actions}>
            <Button variant="secondary" onClick={() => setIsFormOpen(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
              Delete
            </Button>
          </div>
        </header>

        <dl className={styles.meta}>
          <dt className={styles.metaLabel}>Created</dt>
          <dd>
            <time dateTime={project.createdAt}>{formatDate(project.createdAt)}</time>
          </dd>
        </dl>

        <section>
          <h2 className={styles.sectionTitle}>Description</h2>
          <p className={project.description ? styles.description : styles.descriptionEmpty}>
            {project.description || 'No description yet.'}
          </p>
        </section>
      </article>

      <ProjectFormModal
        isOpen={isFormOpen}
        initialValues={toFormValues(project)}
        onSubmit={handleUpdate}
        onClose={() => setIsFormOpen(false)}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete project"
        message={`"${project.name}" will be permanently removed. This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  )
}
