import { useHttp } from "../../utils/http";
import { useAsync } from "../useAsync";
import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { Param, Project } from "../../pages/ProjectList/ProjectList";


/**
 * 获取project列表
 * @param param
 */
export const useProjects = (param: Param = {})=>{
  const client = useHttp();
  let {data, runWithRetry, ...result } = useAsync<Project[]>();

  useEffect(() => {
    runWithRetry(()=>client('projects',{data: cleanObject({...param})}))
  }, [param]);

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