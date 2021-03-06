import React, { FunctionComponent } from "react";
import { Dashboard } from "../../types";
import { useTasks } from "../../hooks/apis/task";
import { useDashboardQueryKey, useTaskSearchParams } from "../../hooks/useProjectIdUrl";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import { useTaskTypes } from "../../hooks/apis/taskType";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import CreateTask from "./CreateTask";
import { useTaskModal } from "../../hooks/useTaskModal";
import Mark from "../../components/Mark";
import { useDeleteDashboard } from "../../hooks/apis/dashboard";
import { Row } from "../../components/lib";
import { Drag, Drop, DropChild } from "../../components/DragAndDrop";

interface OwnProps {
  dashboard: Dashboard
}

type Props = OwnProps;

const DashboardCol: FunctionComponent<Props> = React.forwardRef<HTMLDivElement,{dashboard: Dashboard}>(({ dashboard, ...props },ref) => {
  const [params] = useTaskSearchParams()
  const { data: allTasks } = useTasks(params);
  const {starEdit} = useTaskModal()
  const tasks = allTasks?.filter(task=>task.kanbanId === dashboard.id)

  return (<Container ref={ref} {...props}>
    <Row between={true}>
      <h3>{dashboard.name}</h3>
      <More dashboard={dashboard} key={dashboard.id}/>
    </Row>
    <TaskContainer>
      <Drop type={"ROW"} direction={'vertical'} droppableId={''+dashboard.id}>
        <DropChild style={{minHeight: '5px'}}>
          {
            tasks?.map((task, index) => <Drag key={task.id} index={index} draggableId={''+task.id}>
              <div>
                <Card onClick={()=>starEdit(task.id)} style={{marginBottom: '.5rem',cursor: 'pointer'}} key={task.id}>
                  <Mark content={task.name} keyword={params.name}/>
                  <div>
                    <TaskTypeIcon id={task.typeId}/>
                  </div>
                </Card>
              </div>
            </Drag>)
          }
        </DropChild>
      </Drop>
      <CreateTask dashboardId={dashboard.id}/>
    </TaskContainer>
  </Container>);
});

const TaskTypeIcon = ({id}: {id: number}) => {
  const {data: taskTypes} = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if(!name){
    return null;
  }
  return <img src={name === 'task'?taskIcon: bugIcon} alt={'icon'}/>
}


const More = ({dashboard}: {dashboard: Dashboard}) => {
  const {mutateAsync} = useDeleteDashboard(useDashboardQueryKey())

  function startEdit() {
    Modal.confirm({
      okText: '??????',
      cancelText: '??????',
      title: '????????????????????????',
      onOk(){
        return mutateAsync({id: dashboard.id})
      }
    })
  }

  return <Dropdown overlay={<Menu>
    <Menu.Item>
      <Button type={'link'} onClick={startEdit}>??????</Button>
    </Menu.Item>

  </Menu>}>
    <Button type={"link"}>...</Button>
  </Dropdown>
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
