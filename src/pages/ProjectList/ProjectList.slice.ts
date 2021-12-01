import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// 1. 定义state类型和初始值
interface State{
  modalOpen: boolean;
}

const initialState: State = {
  modalOpen: false
}

// 2. 创建slice
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

// 3. 导出状态select和操作状态的方法actions
// openModal closeModal
// const dispatch = useDispatch();()=>dispatch(projectListActions.openModal())
export const projectListActions = projectListSlice.actions
// const modalOpen = useSelector(selectModalOpen)
export const selectModalOpen = (state: RootState) => state.projectList.modalOpen