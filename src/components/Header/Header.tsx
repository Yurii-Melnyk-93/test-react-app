import { HeaderMenu } from '@/components/HeaderMenu'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>My CRM</h1>
        <p className={styles.headerSubtitle}>Manage your customer relationships effectively</p>
      </div>
      <div className={styles.headerActions}>
        <HeaderMenu />
      </div>
    </header>
  )
}