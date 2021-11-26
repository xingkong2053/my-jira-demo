import React, { FunctionComponent } from 'react';
import ProjectList from "./pages/ProjectList/Index";
import { useAuth } from "./context/auth-context";
import { Button } from "antd";
import styled from "@emotion/styled";
import { Row } from "./components/lib";

interface OwnProps {}

type Props = OwnProps;

const AuthenticatedApp: FunctionComponent<Props> = (props) => {
  let { logout } = useAuth();
  return <Container>
    <Header between>
      <HeaderLeft gap>
        <h2>Logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Button onClick={logout} type={'link'}>Logout</Button>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectList/>
    </Main>
  </Container>;
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: "header header header"
                        "nav main aside"
                        "footer footer footer";
  height: 100vh;
`

const Header = styled(Row)`
  grid-area: header;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`grid-area: main`
const Nav = styled.nav`grid-area: nav`
const ASide = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`

export default AuthenticatedApp;
