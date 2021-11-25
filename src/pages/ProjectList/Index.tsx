import React, { FunctionComponent, useEffect, useState } from "react";
import SearchPanel, { User } from "./SearchPanel";
import List from "./List";
import { cleanObject } from "../../utils";
import qs from 'qs'
import useMount from "../../hooks/useMount";
import useDebounce from "../../hooks/useDebounce";
import { useHttp } from "../../utils/http";

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
  const client = useHttp();

  useEffect(() => {
    client('projects',{data: cleanObject(debParam)}).then(setList)
  }, [debParam]);

  useMount(() => {
    client('users').then(setUsers)
  });

  return (<div>
    <SearchPanel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>);
};

export default ProjectList;
