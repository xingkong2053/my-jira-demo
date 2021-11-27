import { useState } from "react";
import { User } from "../../pages/ProjectList/SearchPanel";
import useMount from "../useMount";
import { useHttp } from "../../utils/http";


export const useUser = ()=>{
  const client = useHttp();
  const [users, setUsers] = useState<User[]>([]);
  useMount(() => {
    client('users').then(data=>{
      const users = data as User[]
      setUsers(users)
    })
  });
  return {userList:users}
}