import React, { FunctionComponent } from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../../hooks/apis/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "../ProjectList/ProjectList.slice";

interface OwnProps {
}

type Props = OwnProps;

const ProjectPopover: FunctionComponent<Props> = () => {
  const {projectList} =  useProjects()
  const dispatch = useDispatch()
  const pinedProjects = projectList?.filter(p=>p.pin)
  const content = <Container>
    <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
    <List>
      {
        pinedProjects?.map(p=><List.Item key={p.id}>
          <List.Item.Meta title={p.name}/>
        </List.Item>)
      }
    </List>
    <Divider/>
    <ButtonNoPadding onClick={()=>dispatch(projectListActions.openModal())} type={"link"}>创建项目</ButtonNoPadding>
  </Container>;
  return <Popover placement={"bottom"} content={content}>
    项目
  </Popover>;
};

const Container = styled.div`
  min-width: 30rem;
`

export default ProjectPopover;
