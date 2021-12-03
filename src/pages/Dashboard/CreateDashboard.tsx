import React, { FunctionComponent, useState } from "react";
import { useDashboardQueryKey, useProjectIdUrl } from "../../hooks/useProjectIdUrl";
import { useAddDashboard } from "../../hooks/apis/dashboard";
import { Input } from "antd";
import { Container } from "./DashboardCol";

interface OwnProps {}

type Props = OwnProps;

const CreateDashboard: FunctionComponent<Props> = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdUrl();
  const {mutateAsync} = useAddDashboard(useDashboardQueryKey())
  const submit = async () => {
    await mutateAsync({name,projectId})
    setName('')
  }
  return <Container>
    <Input
      size={"large"}
      placeholder={'新建看板名称'}
      onPressEnter={submit}
      value={name}
      onChange={e=>setName(e.target.value)}
    />
  </Container>;
};

export default CreateDashboard;
