import React, { ReactNode } from "react";
import * as auth from "./auth-provider";
import { http } from "./utils/http";
import useMount from "./hooks/useMount";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAsync } from "./hooks/useAsync";
import { FullPageError, FullPageLoading } from "./components/lib";
import { useDispatch } from "react-redux";
import { bootstrap } from "./store/slice/auth.slice";
import { User } from "./utils/types";

// 初始化时根据token获取user
export const bootstrapUser = async ()=>{
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me',{token});
    user = data.user
  }
  return Promise.resolve(user)
}

export const Auth = ({ children }: {children: ReactNode})=>{
  let { isIdle, isLoading, isError, error ,run} = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(()=>{
    run(dispatch(bootstrap()))
  })

  // 全屏加载
  if(isIdle || isLoading){
    return <FullPageLoading/>
  }

  if(isError){
    return error && <FullPageError error={error}/>
  }

  return <QueryClientProvider client={new QueryClient()} children={children}/>
}