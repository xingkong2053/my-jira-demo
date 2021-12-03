import React, { FunctionComponent } from "react";
import { Dashboard } from "../../types";
import { useTasks } from "../../hooks/apis/task";
import { useTaskSearchParams } from "../../hooks/useProjectIdUrl";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import { useTaskTypes } from "../../hooks/apis/taskType";
import styled from "@emotion/styled";
import { Card } from "antd";

interface OwnProps {
  dashboard: Dashboard
}

type Props = OwnProps;

const DashboardCol: FunctionComponent<Props> = (props) => {
  const {dashboard} = props
  const [params] = useTaskSearchParams()
  const { data: allTasks } = useTasks(params);
  const tasks = allTasks?.filter(task=>task.kanbanId === dashboard.id)

  return (<Container>
    <h3>{dashboard.name}</h3>
    <TaskContainer>
      {
        tasks?.map(task => <Card style={{marginBottom: '.5rem'}} key={task.id}>
          <div>{task.name}</div>
          <TaskTypeIcon id={task.typeId}/>
        </Card>)
      }
    </TaskContainer>
  </Container>);
};

const TaskTypeIcon = ({id}: {id: number}) => {
  const {data: taskTypes} = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if(!name){
    return null;
  }
  return <img src={name === 'task'?taskIcon: bugIcon} alt={'icon'}/>
}

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244,245,247);
  display: flex;
  flex-direction: column;
  padding: .7rem .7rem 1rem;
  margin-right: 1.5rem;
`
const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar{
    display: none;
  }
`

export default DashboardCol;
