import React, { FunctionComponent } from 'react';
import { User } from "./SearchPanel";
import { Project } from "./ProjectList";
import { Card, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";
import Star from "../../components/Star";
import { useEditProject } from "../../hooks/apis/project";

// List属性继承antd.Table属性
interface ListProps extends TableProps<Project>{
  users: User[],
  refresh?: React.MutableRefObject<() => void>
}

const List: FunctionComponent<ListProps> = (props) => {

  // api/project/useEditProject
  // 调用mutate发送请求
  const {mutate} = useEditProject()

  const columns: ColumnsType<Project> = [{
    title: <Star stared={true} disabled/> ,
    dataIndex: 'pin',
    key: 'pin',
    render: (value,project) => <Star stared={project.pin} onStarChange={stared => {mutate({id:project.id,pin: stared}).then(()=>props.refresh?.current?.())} }/>
  },{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (value,project) => <Link to={'/projects/'+project.id}>{project.name}</Link>,
    sorter: (a,b) => a.name.localeCompare(b.name)
  },{
    title: '部门',
    dataIndex: 'organization',
    key: 'organization'
  },{
    title: '负责人',
    dataIndex: 'personId',
    key: 'personId',
    render: (value, project) => <span>{users.find(user=>user.id === project.personId)?.name||'未知'}</span>
  },{
    title: '创建时间',
    dataIndex: 'created',
    key: 'created',
    render: (value, project) => <span>{project.created && dayjs(project.created).format('YYYY-MM-DD')}</span>
  }]

  let { users } = props;
  return <Card>
    <Table pagination={false} columns={columns} {...props}/>
  </Card>
};

export default List;
