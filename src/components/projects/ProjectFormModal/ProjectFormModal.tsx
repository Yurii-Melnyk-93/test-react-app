import { Button, Modal } from '@/components/ui'
import { ProjectForm } from '@/components/projects/ProjectForm'
import type { ProjectFormValues } from '@/types/Project'

type ProjectFormModalProps = {
  isOpen: boolean
  /** Omitted when creating; supplied when editing an existing project. */
  initialValues?: ProjectFormValues
  onSubmit: (values: ProjectFormValues) => void
  onClose: () => void
}

const FORM_ID = 'project-form'

export const ProjectFormModal = ({
  isOpen,
  initialValues,
  onSubmit,
  onClose,
}: ProjectFormModalProps) => {
  const isEditing = Boolean(initialValues)

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? 'Edit project' : 'New project'}
      onClose={onClose}
      closeOnBackdropClick={false}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID}>
            {isEditing ? 'Save changes' : 'Create project'}
          </Button>
        </>
      }
    >
      {/*
        Modal renders nothing while closed, so the form remounts on every open
        and react-hook-form picks up the current defaultValues each time.
      */}
      <ProjectForm formId={FORM_ID} defaultValues={initialValues} onSubmitForm={onSubmit} />
    </Modal>
  )
}
