import { NavLink } from 'react-router-dom'
import { PATHS } from '@/router'
import styles from './Header.module.scss'

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <NavLink to={PATHS.PROJECTS} className={styles.brand}>
        <span className={styles.mark} aria-hidden="true">
          PM
        </span>
        Project Manager
      </NavLink>

      <nav aria-label="Main">
        <NavLink
          to={PATHS.PROJECTS}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          Projects
        </NavLink>
      </nav>
    </div>
  </header>
)
