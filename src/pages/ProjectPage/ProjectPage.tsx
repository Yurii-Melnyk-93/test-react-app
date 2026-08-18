import style from './ProjectPage.module.scss';

export const ProjectPage = () => {
  return (
    <div className={style.projectPage}>
      <h1 className={style.projectPageTitle}>Project Page</h1>
      <p className={style.projectPageDescription}>This is the project page where you can view and manage your projects.</p>
    </div>
  )
}