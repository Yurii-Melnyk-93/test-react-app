import type { ProjectFormValues, ProjectFormProps } from '@/types/ProjectForm';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/FormField';
import styles from './ProjectForm.module.scss';

export const ProjectForm = ({ defaultValues, formId, onSubmitForm }: ProjectFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormValues>({ defaultValues });
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
    </form>
  );
}