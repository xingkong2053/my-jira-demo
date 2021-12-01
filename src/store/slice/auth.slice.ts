import { User } from "../../pages/ProjectList/SearchPanel";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../index";
import * as auth from "../../auth-provider";
import { AuthForm, bootstrapUser } from "../../Auth";

interface State{
  user: User | null;
}

const initialState: State = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action){
      state.user = action.payload
    }
  }
})

export const authActions = authSlice.actions

// 异步actions(thunks)
// dispatch(login(form))
export const login = (form: AuthForm) => {
  // 异步需要返回函数类型的action,非对象类型
  return (dispatch: AppDispatch) => {
    return auth.login(form)
      .then(user=>dispatch(authActions.setUser(user)))
  }
}

export const register = (form: AuthForm) => {
  return (dispatch: AppDispatch) => {
    return auth.register(form)
      .then(user=>dispatch(authActions.setUser(user)))
  }
}

export const logout = () => {
  return (dispatch: AppDispatch) => {
    return auth.logout()
      .then(()=>dispatch(authActions.setUser(null)))
  }
}

export const bootstrap = () => {
  return (dispatch: AppDispatch) => {
    return bootstrapUser().then(user=>dispatch(authActions.setUser(user)))
  }
}


export const selectUser = (state: RootState) => state.auth