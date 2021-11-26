import React, { FunctionComponent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";

interface OwnProps {}

type Props = OwnProps;

const Regsiter: FunctionComponent<Props> = (props) => {

  const {register} = useAuth()

  return <Form onFinish={register}>
    <Form.Item name={'username'} rules={[{required: true, message:'请输入用户名'}]}>
      <Input type="text" id={'username'} defaultValue={'admin'}/>
    </Form.Item>
    <Form.Item name={'password'} rules={[{required: true, message:'请输入密码'}]}>
      <Input type="password" id={'password'} defaultValue={'admin'}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType={'submit'} type={"primary"} shape={'round'}>Register</Button>
    </Form.Item>
  </Form>;
};

export default Regsiter;
