import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import type { Project, ProjectFormValues } from '@/types/Project'
import { loadProjects } from '@/store/localStorage'

export type ProjectsState = {
  items: Project[]
}

const initialState: ProjectsState = {
  items: loadProjects(),
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: {
      reducer: (state, action: PayloadAction<Project>) => {
        state.items.unshift(action.payload)
      },
      // `prepare` keeps id/date generation out of the reducer so it stays pure.
      prepare: (values: ProjectFormValues) => ({
        payload: {
          ...values,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        },
      }),
    },

    updateProject: (
      state,
      action: PayloadAction<{ id: string; values: ProjectFormValues }>,
    ) => {
      const { id, values } = action.payload
      const project = state.items.find((item) => item.id === id)

      if (project) {
        Object.assign(project, values)
      }
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addProject, updateProject, deleteProject } = projectsSlice.actions

export default projectsSlice.reducer
