import styles from './ProjectList.module.scss';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types/Project';
import { Table } from '@/components/Table';
import { PATHS } from '@/router/path';

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  const navigate = useNavigate();

  const columns = [
    { key: 'name', title: 'Name', render: (project: Project) => project.name },
    { key: 'description', title: 'Description', render: (project: Project) => project.description },
  ];
  return (
    <div className={styles.projectList}>
      <Table
        columns={columns}
        items={projects}
        getRowKey={(project) => project.id}
        onRowClick={(project) => navigate(`${PATHS.PROJECTS}/${project.id}`)}
      />
    </div>
  )
}