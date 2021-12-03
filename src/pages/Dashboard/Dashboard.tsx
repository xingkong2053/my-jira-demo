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
  return (<ScreenContainer>
    <h1>{curProject?.name}看板</h1>
    <SearchPanel/>
    {isLoading ? <Spin size={"large"}/> : <ColumnsContainer>
      {dashboards?.map(dashboard=><DashboardCol dashboard={dashboard} key={dashboard.id}/>)}
      <CreateDashboard/>
    </ColumnsContainer>}
    <TaskModal/>
  </ScreenContainer>);
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-right: 2rem;
  flex: 1;
`

export default Dashboard;
