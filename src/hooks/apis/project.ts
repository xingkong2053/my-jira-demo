import { useHttp } from "../../utils/http";
import { cleanObject } from "../../utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Param, Project } from "../../pages/ProjectList/ProjectList";
import { useUrlQueryParam } from "../useUrlQueryParam";


/**
 * 获取project列表
 * @param param
 */
export const useProjects = (param?: Param)=>{
  const client = useHttp();
  const {data: projectList, ...rest} = useQuery<Project[],Error>(['projects', param], ()=>client('projects',{ data: cleanObject({ ...param || {} })}))
  return { projectList , ...rest}
}

/**
 * 更新project
 */
export const useEditProject = ()=>{
  const client = useHttp()
  const queryClient = useQueryClient();
  const [searchParams] = useUrlQueryParam(['name','personId']);
  const queryKey = ['projects',searchParams]
  // https://react-query.tanstack.com/reference/useMutation#_top
  return useMutation((params: Partial<Project>)=>client("projects/" + params.id,{data: params, method: 'PATCH'}),
    {
      //更新之后使projects缓存失效
      onSuccess: ()=> queryClient.invalidateQueries(queryKey),
      // 乐观更新
      // 在请求之前将数据更新为期望的值
      // 如果请求出现错误，则回滚
      async onMutate(target){
        const prevItems: Project[] | undefined = queryClient.getQueryData(queryKey)
        queryClient.setQueryData(queryKey,prevItems?.map(p => p.id === target.id ? {...p,...target}:p) || [])
        // 返回context
        return {prevItems}
      },
      onError(error,newItem,context){
        queryClient.setQueryData(queryKey,(context as any).prevItems)
      }
    })
}

/**
 * 添加project
 */
export const useAddProject = ()=>{
  const client = useHttp()
  const queryClient = useQueryClient();
  const mutate = (params: Partial<Project>) => client("projects",{data: params, method: 'POST'})
  return useMutation(mutate,{onSuccess: ()=> queryClient.invalidateQueries('projects')})
}

/**
 * 删除project
 */
export const useDeleteProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient();
  return useMutation(
    ({id}:{id: number})=>client('projects/'+id,{method: 'DELETE'}),
    {
      onSuccess:()=>queryClient.invalidateQueries('projects')
    })
}


export const useProjectDetail = (id?: number) =>{
  const client = useHttp();
  return useQuery(['project',{id}],()=> client("projects/"+id),{enabled: !!id/*当id为空时不发送请求*/})
}