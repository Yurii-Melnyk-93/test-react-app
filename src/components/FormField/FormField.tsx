import type { FormFieldProps } from '@/types/FormField';
import styles from './FormField.module.scss';

export const FormField = ({ as = 'input', id, label, error, className, ...inputProps }: FormFieldProps) => {
  const Tag = as as React.ElementType;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <Tag id={id} className={`${styles[as]} ${error ? styles.errorInput : ''} ${className ?? ''}`} {...inputProps} />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
