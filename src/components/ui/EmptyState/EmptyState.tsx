import type { ReactNode } from 'react'
import styles from './EmptyState.module.scss'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: string
  action?: ReactNode
}

export const EmptyState = ({ title, description, icon = '📁', action }: EmptyStateProps) => (
  <div className={styles.empty}>
    <span className={styles.icon} aria-hidden="true">
      {icon}
    </span>
    <p className={styles.title}>{title}</p>
    {description && <p className={styles.description}>{description}</p>}
    {action}
  </div>
)
