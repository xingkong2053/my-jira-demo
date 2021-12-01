import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface State{
  modalOpen: boolean;
}

const initialState: State = {
  modalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // openModal: (state, action) => {}
    // 这里不用返回一个新的state, toolkit自动完成这件事情
    openModal(state){
      state.modalOpen = true
    },
    closeModal(state){
      state.modalOpen = false
    }
  }
})

// openModal closeModal
export const projectListActions = projectListSlice.actions
export const selectModalOpen = (state: RootState) => state.projectList.modalOpen