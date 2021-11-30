import { useHttp } from "../../utils/http";
import { useAsync } from "../useAsync";
import { useCallback, useEffect } from "react";
import { cleanObject } from "../../utils";
import { Param, Project } from "../../pages/ProjectList/ProjectList";


/**
 * 获取project列表
 * @param param
 */
export const useProjects = (param?: Param)=>{
  const client = useHttp();
  let {data, run, ...result } = useAsync<Project[]>();
  const getProjects = useCallback(()=>client('projects', { data: cleanObject({ ...param || {} })}),[client,param])
  useEffect(() => {
    run(getProjects(),{retry: getProjects})
  }, [getProjects,run] /* 不可以把一个既不是基本类型又不是状态的变量放入依赖里，如run(),如果加入到dependency中需要用到useMemo和useCallback */);

  return {...result,projectList: data}
}

/**
 * 更新project
 */
export const useEditProject = ()=>{
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client("projects/" + params.id,{data: params, method: 'PATCH'}))
  }
  return {
    mutate,
    ...asyncResult
  }
}

/**
 * 添加project
 */
export const useAddProject = ()=>{
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client("projects/" + params.id,{data: params, method: 'POST'}))
  }
  return {
    mutate,
    ...asyncResult
  }
}