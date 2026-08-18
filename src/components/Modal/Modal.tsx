import styles from './Modal.module.scss'
import type { ReactNode } from 'react'

interface ModalProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  clickOutsideToClose?: boolean;
  onClose: () => void;
}

export const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  footer,
  clickOutsideToClose = true,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={clickOutsideToClose ? onClose : undefined}
    >
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children && (
          <div className={styles.body}>
            {children}
          </div>
        )}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};