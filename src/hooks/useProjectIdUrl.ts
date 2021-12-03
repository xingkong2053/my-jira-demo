import { useLocation } from "react-router";
import { useProjectDetail } from "./apis/project";
import { useUrlQueryParam } from "./useUrlQueryParam";
import { useMemo } from "react";
import { Task } from "../types";

export const useProjectIdUrl = () => {
  const {pathname} = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id)
}

export const useProjectInUrl = () => useProjectDetail(useProjectIdUrl())

export const useDashboardSearchParams = () => ({projectId: useProjectIdUrl()})

export const useDashboardQueryKey = () => ['kanbans', useDashboardSearchParams()]

export const useTaskSearchParams = () => {
  const [ param, setTaskSearchParams ] = useUrlQueryParam(['name','typeId','processorId','tagId']);
  const projectId = useProjectIdUrl()
  return [
    useMemo(()=>({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        // tagId: Number(param.tagId) || undefined,
        name: param.name
      } as Partial<Task>),[projectId,param]),
    setTaskSearchParams
  ] as const /*注意返回元组类型需要加上as const*/
}

export const useTaskQueryKey = () => ['tasks', useDashboardSearchParams()]