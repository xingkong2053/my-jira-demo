import React, { FunctionComponent } from 'react';
import ProjectList from "./pages/ProjectList/Index";
import { useAuth } from "./context/auth-context";
import { Button } from "antd";

interface OwnProps {}

type Props = OwnProps;

const AuthenticatedApp: FunctionComponent<Props> = (props) => {
  let { logout } = useAuth();
  return <div>
    <Button onClick={logout} danger>Logout</Button>
    <ProjectList/>
  </div>;
};

export default AuthenticatedApp;
