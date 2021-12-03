import { useUrlQueryParam } from "./useUrlQueryParam";
import { useTaskDetail } from "./apis/task";
import { useCallback } from "react";


export const useTaskModal = () => {
  const [{editTaskId}, setEditTaskId] = useUrlQueryParam(['editTaskId'])
  const {data: editTask,isLoading} = useTaskDetail(Number(editTaskId))
  const starEdit = useCallback((id: number)=>setEditTaskId({editTaskId:id}),[setEditTaskId])
  const close = useCallback(()=>setEditTaskId({editTaskId:''}),[setEditTaskId])
  return {
    visible: Boolean(editTaskId),
    editTask,
    starEdit,
    close,
    isLoading
  }
}
