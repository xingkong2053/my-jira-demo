import React, { ChangeEvent, FunctionComponent } from "react";
import { Param } from "./Index";
import { Form, Input, Select } from "antd";

export interface User{
  id: string;
  name?: string;
  email?: string;
  title?: string;
  organization?: string;
  token?: string;
}

interface OwnProps {
  users: User[]
  param: Param,
  setParam: React.Dispatch<Param>
}

type Props = OwnProps;



const SearchPanel: FunctionComponent<Props> = (props) => {

  let { param, setParam, users} = props;


  const handleInput = (e: ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    setParam({
      ...param,
      name: e.target.value
    })
  }

  function selectChange(value: string) {
    setParam({...param,personId: value})
  }

  return (<Form layout={'inline'} style={{marginBottom: '2rem'}}>
    <Form.Item>
      <Input placeholder={'项目名'} type="text" value={param.name} onChange={handleInput}/>
    </Form.Item>
    <Form.Item>
      <Select value={param.personId} onChange={selectChange}>
        <Select.Option value="">负责人</Select.Option>
        {users.map(u=> <Select.Option value={u.id} key={u.id}>{u.name}</Select.Option>)}
      </Select>
    </Form.Item>
  </Form>);
};

export default SearchPanel;
