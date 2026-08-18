import { Outlet } from 'react-router-dom'
import { Header } from '@/layouts/Header'
import { Footer } from '@/layouts/Footer'
import styles from './DefaultLayout.module.scss'

export const DefaultLayout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.content}>
      <Outlet />
    </main>
    <Footer />
  </div>
)
