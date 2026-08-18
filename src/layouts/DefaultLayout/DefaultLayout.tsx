import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import styles from './DefaultLayout.module.scss';

export const DefaultLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}