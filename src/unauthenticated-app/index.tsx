import React, { FunctionComponent, useState } from "react";
import Login from "./Login";
import Regsiter from "./register";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";


interface OwnProps {}

type Props = OwnProps;

const UnauthenticatedApp: FunctionComponent<Props> = (props) => {

  const [isRegister, setIsRegister] = useState(false);

  return <Background>
    <Container>
      <Header/>
      <ShadowCard>
        <Title>{isRegister?'Register':'Login'}</Title>
        {isRegister?<Regsiter/>:<Login/>}
        <Divider/>
        <Button onClick={()=>setIsRegister(!isRegister)} type={'link'}>Switch To {isRegister?'Login':'Register'}</Button>
      </ShadowCard>
    </Container>
  </Background>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: .3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,.1) 0 0 10px;
  text-align: center;
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem)/2) - 3.2rem), calc(((100vw - 40rem)/2) - 3.2rem), cover;
  background-image: url(${left}) ,url(${right});
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgba(94,108,132);
`

export default UnauthenticatedApp;
