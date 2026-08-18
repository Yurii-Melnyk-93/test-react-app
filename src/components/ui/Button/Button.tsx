import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

type ButtonProps = {
  variant?: ButtonVariant
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className,
  children,
  ...buttonProps
}: ButtonProps) => {
  const classNames = [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classNames} {...buttonProps}>
      {children}
    </button>
  )
}
