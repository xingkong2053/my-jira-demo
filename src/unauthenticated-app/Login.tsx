import React, { FunctionComponent } from "react";
import { Alert, Button, Form, Input } from "antd";
import { useAsync } from "../hooks/useAsync";
import { useTitle } from "../hooks/useTitle";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/auth.slice";
import { User } from "../utils/types";

interface OwnProps {}

type Props = OwnProps;

const Login: FunctionComponent<Props> = () => {

  let { error, isError, isLoading, run} = useAsync();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  useTitle('请登录')

  const onFinish = (form: {username: string,password: string})=>{
    run(dispatch(login(form)))
  }

  return <Form onFinish={onFinish} initialValues={{username: 'admin',password: 'admin'}}>
    {isError && <Form.Item><Alert message={error?.message} type={"error"} showIcon/></Form.Item>}
    <Form.Item name={'username'}>
      <Input type="text" id={'username'}/>
    </Form.Item>
    <Form.Item name={'password'}>
      <Input type="password" id={'password'}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType={'submit'} type={"primary"} loading={isLoading}>Login</Button>
    </Form.Item>
  </Form>;
};

export default Login;
