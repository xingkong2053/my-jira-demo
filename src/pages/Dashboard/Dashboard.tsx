import React, { FunctionComponent, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import { useDashBoards, useReorderDashboard } from "../../hooks/apis/dashboard";
import { useDashboardSearchParams, useProjectInUrl, useTaskSearchParams } from "../../hooks/useProjectIdUrl";
import DashboardCol from "./DashboardCol";
import styled from "@emotion/styled";
import SearchPanel from "./SearchPanel";
import { useReorderTask, useTasks } from "../../hooks/apis/task";
import { Spin } from "antd";
import CreateDashboard from "./CreateDashboard";
import TaskModal from "./TaskModal";
import { ScreenContainer } from "../../components/lib";
import useDebounce from "../../hooks/useDebounce";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/DragAndDrop";

interface OwnProps {}

type Props = OwnProps;

const Dashboard: FunctionComponent<Props> = () => {
  useTitle("看板列表")
  const { data: dashboards, isLoading: dashboardIsLoading } = useDashBoards(useDashboardSearchParams())
  const [taskSearchParams] = useTaskSearchParams()
  const debParam = useDebounce(taskSearchParams,200)
  const {isLoading: taskIsLoading} = useTasks(debParam)
  const { data: curProject } = useProjectInUrl();
  const dropEndHandle = useDropEnd();
  const isLoading = dashboardIsLoading && taskIsLoading
  return <DragDropContext onDragEnd={dropEndHandle}>
    <ScreenContainer>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel/>
      {isLoading ?
        <Spin size={"large"}/> :
        <ColumnsContainer>
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={'dashboard'}>
            <DropChild style={{display: 'flex',overflowX: 'scroll', marginRight: '2rem', flex: 1}}>
              {dashboards?.map((dashboard ,index)=><Drag key={dashboard.id} draggableId={'dashboard'+dashboard.id} index={index}><DashboardCol dashboard={dashboard} /></Drag>)}
            </DropChild>
          </Drop>
          <CreateDashboard/>
        </ColumnsContainer>}
      <TaskModal/>
    </ScreenContainer>
  </DragDropContext>;
};

export const useDropEnd = () => {
  const { data: dashboards } = useDashBoards(useDashboardSearchParams());
  const [params] = useTaskSearchParams()
  const { data: allTasks } = useTasks(params) || {data:[]};
  const { mutate } = useReorderDashboard();
  const { mutate: reorderTask } = useReorderTask();
  return useCallback(({source, destination, type} : DropResult) => {
    console.log({source,destination,type});
    if (!destination) {
      return
    }
    if (type === "COLUMN") {
      const fromId = dashboards?.[source.index].id;
      const toId = dashboards?.[destination.index].id
      if (!fromId || !toId || fromId === toId) {
        return
      }
      const type = destination.index > source.index ? 'after' : 'before'
      mutate({fromId, referenceId: toId,type})
    }
    if(type === "ROW"){
      const fromDashboardId = + source.droppableId
      const toDashboardId = + destination.droppableId
      if(fromDashboardId === toDashboardId){
        return
      }
      const fromTask = allTasks?.filter(task=> task.kanbanId === fromDashboardId)[source.index]
      const toTask = allTasks?.filter(task=> task.kanbanId === toDashboardId)[destination.index]
      if (fromTask?.id === toTask?.id) {
        return
      }
      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTask?.id || 0,
        fromDashboardId,
        toDashboardId,
        type: destination.index > source.index || !toTask?.id ? 'after' : 'before'
      })
    }

  },[allTasks, dashboards, mutate, reorderTask])

}


export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`

export default Dashboard;
