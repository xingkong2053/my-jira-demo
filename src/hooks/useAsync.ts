import { useCallback, useRef, useState } from "react";
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
  // const [ retry, setRetry ] = useState< ()=>void >(function lazyInit(){
  //   return ()=>{}
  // })
  // const retryRef = useRef<()=>void>(()=>{})
  // const mountedRef = useMountedRef();

  const setData = useCallback((data: D) => {
    setState({
      data,
      error: null,
      stat: 'success'
    })
  },[])

  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      error,
      stat: 'error'
    })
  },[])

  // run 用来触发异步请求
  const run = useCallback((promise : Promise<D>, runConfig?: {retry: ()=>Promise<D>})=>{
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({...state,stat: 'loading'})
    return promise.then(data=>{
      setData(data)
      return data
    }).catch(error=>{
      setError(error)
      return Promise.reject(error)
    })
  },[setData,setError])

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
    // runWithRetry,
    retryRef: ()=>{},
    ...state,
  }
}