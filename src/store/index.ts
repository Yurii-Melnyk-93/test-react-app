import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './slices/projectsSlice'
import { saveProjects } from './localStorage'
import { debounce } from '@/utils/debounce'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Persist on every change, debounced so a burst of edits writes only once.
const persist = debounce(() => saveProjects(store.getState().projects.items), 300)

store.subscribe(persist)
