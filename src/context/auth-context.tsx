import React, { ReactNode, useContext } from "react";
import * as auth from '../auth-provider'
import { User } from "../pages/ProjectList/SearchPanel";
import { http } from "../utils/http";
import useMount from "../hooks/useMount";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAsync } from "../hooks/useAsync";
import { FullPageError, FullPageLoading } from "../components/lib";


const AuthContext = React.createContext<{
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext'

interface  AuthForm {
  username: string;
  password: string;
}

// 初始化时根据token获取user
const bootstrapUser = async ()=>{
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me',{token});
    user = data.user
  }
  return Promise.resolve(user)
}

export const AuthProvider = ({ children }: {children: ReactNode})=>{
  let { data: user, isIdle, isLoading, isError, error ,run, setData: setUser,} = useAsync<User | null>();

  useMount(()=>{
    run(bootstrapUser())
  })

  // 全屏加载
  if(isIdle || isLoading){
    return <FullPageLoading/>
  }

  if(isError){
    return error && <FullPageError error={error}/>
  }

  const login = (form: AuthForm) => auth.login(form).then(user=>setUser(user))  // .then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(user=>setUser(user))
  const logout = () => auth.logout().then(()=>{
    setUser(null)
  })

  return <QueryClientProvider client={new QueryClient()}>
    <AuthContext.Provider value={{user,login,register,logout}} children={children}/>
  </QueryClientProvider>
}

export const useAuth = ()=>{
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('useAuth must be used in tag <AuthContext.Provider>')
  }
  return context
}