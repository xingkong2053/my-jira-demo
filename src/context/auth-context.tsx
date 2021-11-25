import React, { ReactNode, useContext, useState } from "react";
import * as auth from '../auth-provider'
import { User } from "../pages/ProjectList/SearchPanel";

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

export const AuthProvider = ({ children }: {children: ReactNode})=>{
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(user=>setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user=>setUser(user))
  const logout = () => auth.logout().then(()=>{
      setUser(null)
  })

  return <AuthContext.Provider value={{user,login,register,logout}} children={children}/>
}

export const useAuth = ()=>{
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('useAuth must be used in tag <AuthContext.Provider>')
  }
  return context
}