import { Task } from "../../types";
import { useHttp } from "../../utils/http";
import { useQuery } from "react-query";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks',param],() => {
    return client('tasks',{data: param})
  })
}