import React, { FunctionComponent } from "react";
import SearchPanel from "./SearchPanel";
import List from "./List";
import useDebounce from "../../hooks/useDebounce";
import { Button, Typography } from "antd";
import { useProjects } from "../../hooks/apis/project";
import { useUser } from "../../hooks/apis/user";
import { useTitle } from "../../hooks/useTitle";
import { useUrlQueryParam } from "../../hooks/userUrlQueryParam";
import { Row } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./ProjectList.slice";

export const apiUrl = process.env.REACT_APP_API_URL

interface OwnProps {}

type Props = OwnProps;

const ProjectList: FunctionComponent<Props> = () => {
  useTitle('项目列表')
  // 从url中获取query对象
  const [ param, setParam ] = useUrlQueryParam(['name','personId']);
  const debParam = useDebounce(param,200);
  let { error, isError, isLoading, projectList, retry } = useProjects(debParam);
  let { userList } = useUser();
  const dispatch = useDispatch();


  return (<div style={{padding: '3.2rem'}}>
    <Row between={true}>
      <h1>项目列表</h1>
      <Button onClick={()=>dispatch(projectListActions.openModal())}>创建项目</Button>
    </Row>
    <SearchPanel param={param} setParam={setParam} users={userList}/>
    {isError && <Typography.Text type={"danger"}>{error?.message}</Typography.Text>}
    {/* loading为Table组件上的属性，通过属性继承的方式将其映射到List组件上 */}
    <List loading={isLoading} users={userList} dataSource={projectList || []} refresh={retry}/>
  </div>);
};

export default ProjectList;
