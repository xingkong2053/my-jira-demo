import React, { FunctionComponent } from 'react';
import { User } from "./SearchPanel";
import { Project } from "./Index";
import { Card, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/lib/table";
import { Link } from "react-router-dom";

// List属性继承antd.Table属性
interface ListProps extends TableProps<Project>{
  users: User[],
}

const List: FunctionComponent<ListProps> = (props) => {

  const columns: ColumnsType<Project> = [{
    title: '名称',
    render: (value,project) => <Link to={'/projects/'+project.id}>{project.name}</Link>,
    sorter: (a,b) => a.name.localeCompare(b.name)
  },{
    title: '部门',
    dataIndex: 'organization'
  },{
    title: '负责人',
    render: (value, project) => <span>{users.find(user=>user.id === project.personId)?.name||'未知'}</span>
  },{
    title: '创建时间',
    render: (value, project) => <span>{project.created && dayjs(project.created).format('YYYY-MM-DD')}</span>
  }]

  let { users } = props;
  return <Card><Table pagination={false} columns={columns} {...props}/></Card>
};

export default List;
