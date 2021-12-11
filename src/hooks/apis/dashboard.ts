import { Dashboard, SortProps } from "../../types";
import { useHttp } from "../../utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

export const useDashBoards = (param?: Partial<Dashboard>) => {
  const client = useHttp()
  return useQuery<Dashboard[]>(['dashboards',param],() => {
    return client('kanbans',{data: param})
  })
}

export const useAddDashboard = (queryKey: QueryKey)=>{
  const client = useHttp()
  const queryClient = useQueryClient();
  const mutate = (params: Partial<Dashboard>) => client("kanbans",{data: params, method: 'POST'})
  return useMutation(mutate,{onSuccess: ()=> queryClient.invalidateQueries(queryKey)})
}

export const useDeleteDashboard = (queryKey: QueryKey) => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(({id}:{id: number})=>client('kanbans/'+id,{method: 'DELETE'}),{
    onSuccess: ()=>queryClient.invalidateQueries(queryKey)
  })
}

/**
 * 看板拖拽持久化
 */
export const useReorderDashboard = () => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
   return client('kanbans/reorder', {
     data: params,
     method: 'POST'
    })
  })
}
