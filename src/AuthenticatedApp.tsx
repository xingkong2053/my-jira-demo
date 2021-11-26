import React, { FunctionComponent } from 'react';
import ProjectList from "./pages/ProjectList/Index";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import { Routes, Route} from "react-router";
import Project from "./pages/Project/Project";
import { BrowserRouter } from "react-router-dom";

interface OwnProps {}

type Props = OwnProps;

const AuthenticatedApp: FunctionComponent<Props> = (props) => {

  return <Container>
    <PageHeader/>
    <Main>
      <BrowserRouter>
        <Routes>
          <Route path={'/projects'} element={<ProjectList/>}/>
          <Route path={'/projects/:projectId/*'} element={<Project/>}/>
        </Routes>
      </BrowserRouter>
    </Main>
  </Container>;
};

const PageHeader = ()=>{
  let { logout, user } = useAuth();
  return <Header between>
    <HeaderLeft gap>
      {/* 以组件的形式渲染svg */}
      <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown
        overlay={<Menu>
          <Menu.Item key="logout">
            <Button onClick={logout} type={'link'}>Logout</Button>
          </Menu.Item>
        </Menu>}
      >
        <Button type={'link'}>Hi, {user?.name}</Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: "header header header"
                        "main main main"
                        "footer footer footer";
  height: 100vh;
`

const Header = styled(Row)`
  padding: 0 3.2rem;
  grid-area: header;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`grid-area: main`
const Nav = styled.nav`grid-area: nav`
const ASide = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`

export default AuthenticatedApp;
