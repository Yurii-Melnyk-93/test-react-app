import { useForm } from 'react-hook-form'
import { FormField } from '@/components/ui'
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS, type ProjectFormValues } from '@/types/Project'
import styles from './ProjectForm.module.scss'

type ProjectFormProps = {
  /** Passing values switches the form into "edit" mode. */
  defaultValues?: ProjectFormValues
  /** Lets a submit button live outside the form, e.g. in a modal footer. */
  formId: string
  onSubmitForm: (values: ProjectFormValues) => void
}

const EMPTY_PROJECT: ProjectFormValues = {
  name: '',
  description: '',
  status: 'todo',
}

const NAME_MAX_LENGTH = 60
const DESCRIPTION_MAX_LENGTH = 500

export const ProjectForm = ({ defaultValues, formId, onSubmitForm }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({ defaultValues: defaultValues ?? EMPTY_PROJECT })

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmitForm)} className={styles.form} noValidate>
      <FormField
        id="projectName"
        label="Name"
        placeholder="e.g. Marketing Landing"
        error={errors.name}
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 3, message: 'Name must be at least 3 characters' },
          maxLength: {
            value: NAME_MAX_LENGTH,
            message: `Name must be ${NAME_MAX_LENGTH} characters or fewer`,
          },
        })}
      />

      <FormField
        as="textarea"
        id="projectDescription"
        label="Description"
        placeholder="What is this project about?"
        hint="Optional — up to 500 characters."
        error={errors.description}
        {...register('description', {
          maxLength: {
            value: DESCRIPTION_MAX_LENGTH,
            message: `Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer`,
          },
        })}
      />

      <FormField as="select" id="projectStatus" label="Status" {...register('status')}>
        {PROJECT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {PROJECT_STATUS_LABELS[status]}
          </option>
        ))}
      </FormField>
    </form>
  )
}
