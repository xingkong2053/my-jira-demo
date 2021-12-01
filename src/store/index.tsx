import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "../pages/ProjectList/ProjectList.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer
}

export const store = configureStore({
   reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
// store.getState()返回值类型
export type RootState = ReturnType<typeof store.getState>