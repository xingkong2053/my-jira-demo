import { useCallback, useState } from "react";
import useMount from "../useMount";
import { useHttp } from "../../utils/http";
import { User } from "../../utils/types";


export const useUser = ()=>{
  const client = useHttp();
  const [users, setUsers] = useState<User[]>([]);
  useMount(useCallback(() => {
    client('users').then(data=>{
      const users = data as User[]
      setUsers(users)
    })
  },[client]));
  return {userList:users}
}