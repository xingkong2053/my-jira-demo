import React, { FunctionComponent } from "react";
import { useTitle } from "../../hooks/useTitle";
import { useDashBoards } from "../../hooks/apis/dashboard";
import { useDashboardSearchParams, useProjectInUrl } from "../../hooks/useProjectIdUrl";
import DashboardCol from "./DashboardCol";
import styled from "@emotion/styled";
import SearchPanel from "./SearchPanel";

interface OwnProps {}

type Props = OwnProps;

const Dashboard: FunctionComponent<Props> = () => {
  useTitle("看板列表")
  const { data: dashboards } = useDashBoards(useDashboardSearchParams())
  const { data: curProject } = useProjectInUrl();
  return (<div>
    <h1>{curProject?.name}看板</h1>
    <SearchPanel/>
    <ColumnsContainer>
      {dashboards?.map(dashboard=><DashboardCol dashboard={dashboard} key={dashboard.id}/>)}
    </ColumnsContainer>
  </div>);
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`

export default Dashboard;
