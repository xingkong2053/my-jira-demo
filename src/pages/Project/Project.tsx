import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router";
import Group from "./Group";
import Dashboard from "../Dashboard/Dashboard";
import styled from "@emotion/styled";
import { Menu } from "antd";

interface OwnProps {}

type Props = OwnProps;

const Project: FunctionComponent<Props> = () => {
  const units = useLocation().pathname.split('/')

  return (<Container>
    <Aside>
      <Menu mode={"inline"} selectedKeys={[units[units.length-1] === 'group'?'group':'dashboard']}>
        <Menu.Item key={'dashboard'}>
          <Link to={'dashboard'}>看板</Link>
        </Menu.Item>
        <Menu.Item key={'group'}>
          <Link to={'group'}>任务组</Link>
        </Menu.Item>
      </Menu>
    </Aside>
    <Main>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path={'/dashboard'} element={<Dashboard/>}/>
        <Route path={'/group'} element={<Group/>}/>
      </Routes>
    </Main>
  </Container>);
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`

const Aside = styled.aside`
  background-color: rgb(244,245,247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0,0,0,.1);
  overflow: hidden;
  display: flex;
`

export default Project;
