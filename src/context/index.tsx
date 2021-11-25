import React, { FunctionComponent } from 'react';
import { AuthProvider } from "./auth-context";

interface OwnProps {}

type Props = OwnProps;

const AppProviders: FunctionComponent<Props> = (props) => {

  return <AuthProvider>{props.children}</AuthProvider>;
};

export default AppProviders;
