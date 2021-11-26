import React, { FunctionComponent, useEffect, useState } from "react";
import SearchPanel, { User } from "./SearchPanel";
import List from "./List";
import useDebounce from "../../hooks/useDebounce";
import { Typography } from "antd";
import { useProjects } from "../../hooks/apis/project";
import { useUser } from "../../hooks/apis/user";
import { useTitle } from "../../hooks/useTitle";

export const apiUrl = process.env.REACT_APP_API_URL

export interface Project{
  id: number;
  name: string;
  personId?: string;
  organization?: string;
  created?: number;
}

export interface Param{
  name?: string;
  personId?: string;
}

interface OwnProps {}

type Props = OwnProps;

const ProjectList: FunctionComponent<Props> = (props) => {
  useTitle('项目列表')
  const [param, setParam] = useState<Param>({name:'',personId:''});
  const debParam = useDebounce(param,200);
  let { error, isError, isLoading, projectList } = useProjects(debParam);
  let { userList } = useUser();

  return (<div style={{padding: '3.2rem'}}>
    <SearchPanel param={param} setParam={setParam} users={userList}/>
    {isError && <Typography.Text type={"danger"}>{error?.message}</Typography.Text>}
    {/* loading为Table组件上的属性，通过属性继承的方式将其映射到List组件上 */}
    <List loading={isLoading} users={userList} dataSource={projectList || []}/>
  </div>);
};

export default ProjectList;
