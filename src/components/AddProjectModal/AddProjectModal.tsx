// import type { Project } from '@/types/Project';
import styles from './AddProjectModal.module.scss'
import { Modal } from '@/components/Modal';
import { ProjectForm } from '../ProjectForm';
import type { ProjectFormValues } from '@/types/Project';


interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: ProjectFormValues) => void;
}

export const AddProjectModal = ({ isOpen, onClose, onSubmit }: AddProjectModalProps) => {
  const FORM_ID = 'add-project-form';

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <Modal 
        title="Add Project" 
        isOpen={isOpen} 
        onClose={onClose}
        clickOutsideToClose={false}
        children={
          <>
            <ProjectForm formId={FORM_ID} onSubmitForm={onSubmit} />
          </>
        } 
        footer={
          <>
            <button type="button" onClick={onClose}>Close</button>
            <button type="submit" form={FORM_ID}>Add Project</button>
          </>
        }>
      </Modal>
    </div>
  )
}