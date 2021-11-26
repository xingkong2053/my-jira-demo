import React, { FunctionComponent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

interface OwnProps {}

type Props = OwnProps;

const Regsiter: FunctionComponent<Props> = (props) => {

  const {register} = useAuth()

  return <Form onFinish={register} initialValues={{username: 'admin',password: 'admin',cpassword: 'admin'}}>
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

export default Regsiter;
