import React, { FunctionComponent } from 'react';
import ProjectList from "./pages/ProjectList/Index";
import { useAuth } from "./context/auth-context";

interface OwnProps {}

type Props = OwnProps;

const AuthenticatedApp: FunctionComponent<Props> = (props) => {
  let { logout } = useAuth();
  return <div>
    <button onClick={logout}>Logout</button>
    <ProjectList/>
  </div>;
};

export default AuthenticatedApp;
