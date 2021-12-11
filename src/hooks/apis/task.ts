import { SortProps, Task } from "../../types";
import { useHttp } from "../../utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useTaskQueryKey } from "../useProjectIdUrl";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks',param],() => {
    return client('tasks',{data: param})
  })
}

export const useAddTask = (queryKey: QueryKey)=>{
  const client = useHttp()
  const queryClient = useQueryClient();
  const mutate = (params: Partial<Task>) => client("tasks",{data: params, method: 'POST'})
  return useMutation(mutate,{onSuccess: ()=> queryClient.invalidateQueries(queryKey)})
}

export const useEditTask = ()=>{
  const client = useHttp()
  const queryClient = useQueryClient();
  const taskQueryKey = useTaskQueryKey();
  // https://react-query.tanstack.com/reference/useMutation#_top
  return useMutation((params: Partial<Task>)=>client("tasks/" + params.id,{data: params, method: 'PATCH'}),
    {
      //更新之后使projects缓存失效
      onSuccess: ()=> queryClient.invalidateQueries(taskQueryKey),
      // 乐观更新
      // 在请求之前将数据更新为期望的值
      // 如果请求出现错误，则回滚
      async onMutate(target){
        const prevItems: Task[] | undefined = queryClient.getQueryData(taskQueryKey)
        queryClient.setQueryData(taskQueryKey,prevItems?.map(p => p.id === target.id ? {...p,...target}:p) || [])
        // 返回context
        return {prevItems}
      },
      onError(error,newItem,context){
        queryClient.setQueryData(taskQueryKey,(context as any).prevItems)
      }
    })
}

export const useTaskDetail = (id?: number) =>{
  const client = useHttp();
  return useQuery(['task',{id}],()=> client("tasks/"+id),{enabled: !!id/*当id为空时不发送请求*/})
}

export const useDeleteTask = () => {
  const client = useHttp()
  const taskQueryKey = useTaskQueryKey();
  const queryClient = useQueryClient()
  return useMutation(({id}:{id: number})=>client('tasks/'+id,{method: 'DELETE'}),{
    onSuccess: () => queryClient.invalidateQueries(taskQueryKey)
  })
}

/**
 * 看板拖拽持久化
 */
export const useReorderTask = () => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client('tasks/reorder', {
      data: params,
      method: 'POST'
    })
  })
}