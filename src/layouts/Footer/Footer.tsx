import styles from './Footer.module.scss'

export const Footer = () => (
  <footer className={styles.footer}>
    <p>© {new Date().getFullYear()} Project Manager — a React learning project.</p>
  </footer>
)
