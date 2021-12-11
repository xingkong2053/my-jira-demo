import React, { FunctionComponent } from "react";
import { useTitle } from "../../hooks/useTitle";
import { useDashBoards } from "../../hooks/apis/dashboard";
import { useDashboardSearchParams, useProjectInUrl, useTaskSearchParams } from "../../hooks/useProjectIdUrl";
import DashboardCol from "./DashboardCol";
import styled from "@emotion/styled";
import SearchPanel from "./SearchPanel";
import { useTasks } from "../../hooks/apis/task";
import { Spin } from "antd";
import CreateDashboard from "./CreateDashboard";
import TaskModal from "./TaskModal";
import { ScreenContainer } from "../../components/lib";
import useDebounce from "../../hooks/useDebounce";
import { DragDropContext } from "react-beautiful-dnd";
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
  const isLoading = dashboardIsLoading && taskIsLoading
  return <DragDropContext onDragEnd={()=>{}}>
    <ScreenContainer>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel/>
      {isLoading ? <Spin size={"large"}/> : <Drop type={"COLUMN"} direction={"horizontal"} droppableId={'dashboard'}>
        <ColumnsContainer>
          {dashboards?.map((dashboard ,index)=><Drag key={dashboard.id} draggableId={'dashboard'+dashboard.id} index={index}><DashboardCol dashboard={dashboard} /></Drag>)}
          <CreateDashboard/>
        </ColumnsContainer>
      </Drop>}
      <TaskModal/>
    </ScreenContainer>
  </DragDropContext>;
};

export const ColumnsContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`

export default Dashboard;
