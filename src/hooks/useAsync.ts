import { useState } from "react";
import { useMountedRef } from "./useMountedRef";

interface State<D>{
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });
  // useState直接传入函数的含义是，惰性初始化
  // retry : ()=>void
  const [ retry, setRetry ] = useState< ()=>void >(function lazyInit(){
    return ()=>{}
  })
  const mountedRef = useMountedRef();

  const setData = (data: D) => {
    setState({
      data,
      stat: 'success',
      error: null
    })
  }

  const setError = (error: Error) => {
    setState({
      data: null,
      stat: 'error',
      error
    })
  }

  // run 用来触发异步请求
  const run = (promise : Promise<D>, runConfig?: {retry: ()=>Promise<D>})=>{
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    // 更新retry需要的操作
    setRetry(()=>()=>{
      runConfig && runConfig.retry && run(runConfig.retry(),{retry:runConfig.retry})
    })
    setState({...state,stat: 'loading'})
    return promise.then(data=>{
      // 当组件已经挂载并且还没卸载时设置数据
      // 防止在已卸载的组件上设置数据从而发生错误
      if(mountedRef.current){
        setData(data)
      }
      return data
    }).catch(error=>{
      setError(error)
      return Promise.reject(error)
    })
  }

  const runWithRetry = (callback: ()=>Promise<D>) =>{
    return run(callback(),{retry: callback})
  }

  return {
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    isIdle: state.stat === "idle",
    setData,
    setError,
    run,
    runWithRetry,
    retry,
    ...state,
  }
}