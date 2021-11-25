import React, { FunctionComponent, useEffect, useState } from "react";
import SearchPanel, { User } from "./SearchPanel";
import List from "./List";
import { cleanObject } from "../../utils";
import qs from 'qs'
import useMount from "../../hooks/useMount";
import useDebounce from "../../hooks/useDebounce";

export const apiUrl = process.env.REACT_APP_API_URL

export interface Project{
  id?: number;
  name?: string;
  personId?: number;
  organization?: string;
  created?: bigint;
}

export interface Param{
  name?: string;
  personId?: number;
}

interface OwnProps {}

type Props = OwnProps;

const ProjectList: FunctionComponent<Props> = (props) => {

  const [users, setUsers] = useState<User[]>([]);
  const [param, setParam] = useState<Param>({name:'',personId:NaN});
  const [list, setList] = useState<Project[]>([]);
  const debParam = useDebounce(param,200);

  useEffect(() => {
    fetch(apiUrl+'/projects?'+qs.stringify(cleanObject(debParam))).then(async res=>{
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debParam]);

  useMount(() => {
    fetch(apiUrl+'/users').then(async res=>{
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  });

  return (<div>
    <SearchPanel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>);
};

export default ProjectList;
