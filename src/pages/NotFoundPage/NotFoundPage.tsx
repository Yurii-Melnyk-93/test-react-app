import { Link } from 'react-router-dom'
import { PATHS } from '@/router'
import styles from './NotFoundPage.module.scss'

type NotFoundPageProps = {
  title?: string
  message?: string
}

export const NotFoundPage = ({
  title = 'Page not found',
  message = 'The page you are looking for does not exist.',
}: NotFoundPageProps) => (
  <div className={styles.page}>
    <p className={styles.code}>404</p>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.message}>{message}</p>
    <Link to={PATHS.PROJECTS} className={styles.link}>
      Go to projects
    </Link>
  </div>
)
