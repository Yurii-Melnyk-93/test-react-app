import type { FieldError } from 'react-hook-form'
import styles from './FormField.module.scss'

export type FormFieldProps = {
  as?: 'input' | 'textarea'
  id: string
  label: string
  error?: FieldError
} & React.ComponentPropsWithRef<'input' | 'textarea'>

export const FormField = ({
  as = 'input',
  id,
  label,
  error,
  className,
  ...inputProps
}: FormFieldProps) => {
  const Tag = as as React.ElementType

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={error ? true : undefined}
        className={`${styles[as]} ${error ? styles.errorInput : ''} ${className ?? ''}`}
        {...inputProps}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}
