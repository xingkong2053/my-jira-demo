import { TaskType } from "../../types";
import { useHttp } from "../../utils/http";
import { useQuery } from "react-query";

export const useTaskTypes = () => {
  const client = useHttp()
  return useQuery<TaskType[]>(['taskTypes'],() => {
    return client('taskTypes')
  })
}