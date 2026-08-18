import { useForm } from 'react-hook-form'
import { FormField } from '@/components/FormField'
import {
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS,
  type ProjectFormValues,
} from '@/types/Project'
import styles from './ProjectForm.module.scss'

type ProjectFormProps = {
  defaultValues?: ProjectFormValues
  formId: string
  onSubmitForm: (values: ProjectFormValues) => void
}

const EMPTY_PROJECT: ProjectFormValues = {
  name: '',
  description: '',
  status: 'todo',
}

export const ProjectForm = ({ defaultValues, formId, onSubmitForm }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({ defaultValues: defaultValues ?? EMPTY_PROJECT })

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
      <FormField
        as="input"
        id="projectName"
        label="Name"
        error={errors.name}
        {...register('name', { required: 'Name is required' })}
      />
      <FormField
        as="textarea"
        id="projectDescription"
        label="Description"
        error={errors.description}
        {...register('description')}
      />
      <div className={styles.field}>
        <label htmlFor="projectStatus" className={styles.label}>
          Status
        </label>
        <select id="projectStatus" className={styles.select} {...register('status')}>
          {PROJECT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {PROJECT_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
