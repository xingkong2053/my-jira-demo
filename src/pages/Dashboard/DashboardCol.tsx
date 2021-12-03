import React, { FunctionComponent } from "react";
import { Dashboard } from "../../types";
import { useTasks } from "../../hooks/apis/task";
import { useTaskSearchParams } from "../../hooks/useProjectIdUrl";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import { useTaskTypes } from "../../hooks/apis/taskType";
import styled from "@emotion/styled";
import { Card } from "antd";
import CreateTask from "./CreateTask";
import { useTaskModal } from "../../hooks/useTaskModal";

interface OwnProps {
  dashboard: Dashboard
}

type Props = OwnProps;

const DashboardCol: FunctionComponent<Props> = (props) => {
  const {dashboard} = props
  const [params] = useTaskSearchParams()
  const { data: allTasks } = useTasks(params);
  const {starEdit} = useTaskModal()
  const tasks = allTasks?.filter(task=>task.kanbanId === dashboard.id)

  return (<Container>
    <h3>{dashboard.name}</h3>
    <TaskContainer>
      {
        tasks?.map(task => <Card onClick={()=>starEdit(task.id)} style={{marginBottom: '.5rem',cursor: 'pointer'}} key={task.id}>
          <div>{task.name}</div>
          <TaskTypeIcon id={task.typeId}/>
        </Card>)
      }
      <CreateTask dashboardId={dashboard.id}/>
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

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244,245,247);
  display: flex;
  flex-direction: column;
  padding: .7rem .7rem 1rem;
  margin-right: 1.5rem;
  overflow: hidden;
`
const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar{
    display: none;
  }
`

export default DashboardCol;
