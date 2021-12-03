import React, { FunctionComponent, useEffect, useState } from "react";
import { useProjectIdUrl, useTaskQueryKey } from "../../hooks/useProjectIdUrl";
import { Button, Card, Input } from "antd";
import { useAddTask } from "../../hooks/apis/task";

interface OwnProps {
  dashboardId: number;
}

type Props = OwnProps;

const CreateTask: FunctionComponent<Props> = (props) => {
  const {dashboardId} = props
  const [name, setName] = useState('');
  const projectId = useProjectIdUrl();
  const {mutateAsync} = useAddTask(useTaskQueryKey())
  const [inputMode,setInputMode] = useState(false)
  const submit = async () => {
    await mutateAsync({name,projectId,kanbanId:dashboardId})
    setInputMode(false)
    setName('')
  }

  const toggle = ()=>setInputMode(mode=>!mode)

  useEffect(() => {
    if(!inputMode){
      setName('')
    }
  }, [inputMode]);
  if(!inputMode){
    return <Button type={'text'} onClick={toggle}>+创建事务</Button>
  }
  return <Card>
    <Input
      onBlur={toggle}
      placeholder={'需要做些什么'}
      autoFocus
      onPressEnter={submit}
      value={name}
      onChange={e=>setName(e.target.value)}
    />
  </Card>;
};

export default CreateTask;
