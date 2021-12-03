import { Dashboard } from "../../types";
import { useHttp } from "../../utils/http";
import { useQuery } from "react-query";

export const useDashBoards = (param?: Partial<Dashboard>) => {
  const client = useHttp()
  return useQuery<Dashboard[]>(['dashboards',param],() => {
    return client('kanbans',{data: param})
  })
}
