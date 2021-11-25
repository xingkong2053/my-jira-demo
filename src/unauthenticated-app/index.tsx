import React, { FunctionComponent, useState } from "react";
import Login from "./Login";
import Regsiter from "./register";

interface OwnProps {}

type Props = OwnProps;

const UnauthenticatedApp: FunctionComponent<Props> = (props) => {

  const [isRegister, setIsRegister] = useState(false);

  return <div>
    {isRegister?<Regsiter/>:<Login/>}
    <button onClick={()=>setIsRegister(!isRegister)}>Switch To {isRegister?'Login':'Register'}</button>
  </div>;
};

export default UnauthenticatedApp;
