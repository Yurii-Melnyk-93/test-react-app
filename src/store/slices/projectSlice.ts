import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@/types/Project";
import type { ProjectFormValues } from "@/types/ProjectForm";

const initialState: Project[] = [
  {
    id: "1",
    name: "CRM",
    description: "CRM System",
  },
  {
    id: "2",
    name: "Landing",
    description: "Landing Page",
  },
  {
    id: "3",
    name: "ERP",
    description: "Enterprise Resource Planning",
  },
]

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectFormValues>) => {
      state.push({ id: Date.now().toString(), ...action.payload });
    }
  }
})

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;