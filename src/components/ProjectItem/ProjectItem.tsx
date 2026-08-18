import { AddProjectButton } from "@/components/AddProjectButton";
import type { Project } from "@/types/Project";
import styles from './ProjectItem.module.scss';
  
export function ProjectItem({ name, description, id }: Project) {
  return (
    <div className={styles.project}>
      <h2 className={styles.projectTitle}>{name}</h2>
      <p className={styles.projectDescription}>{description}</p>
      <AddProjectButton buttonText="Click Me" onClick={() => console.log("Button clicked", id)} />
    </div>
  )
}