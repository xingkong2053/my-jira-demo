import React, { FunctionComponent } from 'react';
import { User } from "./SearchPanel";
import { Project } from "./Index";
import { Card, Table } from "antd";

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
    title: '',
    render: (value, project) => <span>{users.find(user=>user.id === project.personId)?.name||'未知'}</span>
  }]} dataSource={list}/></Card>
};

export default List;
