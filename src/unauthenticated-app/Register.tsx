import React, { FunctionComponent } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { register } from "../store/slice/auth.slice";
import { User } from "../utils/types";

interface OwnProps {}

type Props = OwnProps;

const Register: FunctionComponent<Props> = () => {

  const dispatch: (...args: unknown[])=>Promise<User> = useDispatch();

  return <Form onFinish={form=>dispatch(register(form))} initialValues={{username: 'admin',password: 'admin',cpassword: 'admin'}}>
    <Form.Item name={'username'} rules={[{required: true, message:'请输入用户名'}]}>
      <Input type="text" id={'username'}/>
    </Form.Item>
    <Form.Item name={'password'} rules={[{required: true, message:'请输入密码'}]}>
      <Input type="password" id={'password'}/>
    </Form.Item>
    <Form.Item name={'cpassword'} rules={[{required: true, message:'请确认密码'}]}>
      <Input type="password" id={'cpassword'}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType={'submit'} type={"primary"} shape={'round'}>Register</Button>
    </Form.Item>
  </Form>;
};

export default Register;
