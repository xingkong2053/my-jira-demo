import React, { FunctionComponent } from 'react';
import { User } from "./SearchPanel";
import { Project } from "./Index";
import { Card, Table } from "antd";
import dayjs from "dayjs";

interface OwnProps {
  users: User[],
  list: Project[]
}

type Props = OwnProps;

const List: FunctionComponent<Props> = (props) => {
  let { list, users } = props;
  return <Card><Table pagination={false} columns={[{
    title: '名称',
    dataIndex: 'name',
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
  }]} dataSource={list}/></Card>
};

export default List;
