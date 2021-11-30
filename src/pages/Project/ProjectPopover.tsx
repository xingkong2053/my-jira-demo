import React, { FunctionComponent } from 'react';
import { List, Popover, Typography } from "antd";
import { Project } from "../ProjectList/ProjectList";
import { useProjects } from "../../hooks/apis/project";

interface OwnProps {}

type Props = OwnProps;

const ProjectPopover: FunctionComponent<Props> = (props) => {
  const {projectList} =  useProjects()
  const pinedProjects = projectList?.filter(p=>p.pin)
  const content = <div>
    <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
    <List>
      {
        pinedProjects?.map(p=><List.Item key={p.id}>
          <List.Item.Meta title={p.name}/>
        </List.Item>)
      }
    </List>
  </div>;
  return <Popover placement={"bottom"} content={content}>
    项目
  </Popover>;
};

ProjectPopover.whyDidYouRender = true

export default ProjectPopover;
