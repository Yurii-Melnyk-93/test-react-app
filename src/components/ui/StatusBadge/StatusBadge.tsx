import { PROJECT_STATUS_LABELS, type ProjectStatus } from '@/types/Project'
import styles from './StatusBadge.module.scss'

type StatusBadgeProps = {
  status: ProjectStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  // The CSS variable is named after the status, so the palette lives in one
  // place (`main.scss`) instead of being duplicated per class here.
  <span
    className={styles.badge}
    style={{ '--badge-color': `var(--status-${status})` } as React.CSSProperties}
  >
    {PROJECT_STATUS_LABELS[status]}
  </span>
)
