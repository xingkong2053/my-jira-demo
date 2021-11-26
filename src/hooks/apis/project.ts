import { useHttp } from "../../utils/http";
import { useAsync } from "../useAsync";
import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { Param, Project } from "../../pages/ProjectList/Index";


export const useProjects = (param: Param = {})=>{
  const client = useHttp();
  let {
    run,
    data,
    ...result
  } = useAsync<Project[]>();

  useEffect(() => {
    run(client('projects',{data: cleanObject({...param})}))
  }, [param]);

  return {...result,projectList: data}
}