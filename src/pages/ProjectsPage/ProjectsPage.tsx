import { AddProjectButton } from "@/components/AddProjectButton"
import { AddProjectModal } from "@/components/AddProjectModal";
import { ProjectList } from "@/components/ProjectList"
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectProjects } from "@/store/selectors/projectSelectors";
import { addProject } from "@/store/slices/projectSlice";
import type { ProjectFormValues } from "@/types/ProjectForm";
import { useState } from "react";


export const ProjectsPage = () => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddProject = (project: ProjectFormValues) => {
    dispatch(addProject(project));
    setIsOpen(false);
  };

  return (
    <>
      <ProjectList projects={projects} />
      <AddProjectButton buttonText="Add Project" onClick={() => setIsOpen(true)} />
      <AddProjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleAddProject} />
    </>
  )
} 
  