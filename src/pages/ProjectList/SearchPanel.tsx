import React, { ChangeEvent, FunctionComponent } from "react";
import { Param } from "./ProjectList";
import { Form, Input } from "antd";
import { UserSelect } from "../../components/UserSelect";

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

  let { param, setParam} = props;


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
      <UserSelect value={param.personId} onChange={selectChange}/>
    </Form.Item>
  </Form>);
};

export default SearchPanel;
