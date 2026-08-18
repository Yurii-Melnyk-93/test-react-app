import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import styles from './FormField.module.scss'

type BaseProps = {
  id: string
  label: string
  error?: FieldError
  hint?: ReactNode
}

/**
 * A union rather than one loose type, so `<FormField as="select">` accepts
 * select attributes and `<FormField as="textarea">` accepts textarea ones.
 */
export type FormFieldProps =
  | (BaseProps & { as?: 'input' } & ComponentPropsWithRef<'input'>)
  | (BaseProps & { as: 'textarea' } & ComponentPropsWithRef<'textarea'>)
  | (BaseProps & { as: 'select' } & ComponentPropsWithRef<'select'>)

export const FormField = ({
  as = 'input',
  id,
  label,
  error,
  hint,
  className,
  children,
  ...fieldProps
}: FormFieldProps) => {
  const Tag = as as ElementType
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <Tag
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={[styles.control, styles[as], error && styles.invalid, className]
          .filter(Boolean)
          .join(' ')}
        {...fieldProps}
      >
        {children}
      </Tag>

      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}

      {error && (
        <span id={errorId} role="alert" className={styles.error}>
          {error.message}
        </span>
      )}
    </div>
  )
}
