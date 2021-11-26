import React, { createRef, FormEvent, FunctionComponent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

interface OwnProps {}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (props) => {

  let { login } = useAuth();

  const onFinish = (form: {username: string,password: string})=>{
    console.log(form);
    login(form)
  }

  return <Form onFinish={onFinish} initialValues={{username: 'admin',password: 'admin'}}>
    <Form.Item name={'username'}>
      <Input type="text" id={'username'}/>
    </Form.Item>
    <Form.Item name={'password'}>
      <Input type="password" id={'password'}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType={'submit'} type={"primary"}>Login</Button>
    </Form.Item>
  </Form>;
};

export default Login;
