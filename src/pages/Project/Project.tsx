import React, { FunctionComponent } from 'react';
import { Link} from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import Group from "./Group";

interface OwnProps {}

type Props = OwnProps;

const Project: FunctionComponent<Props> = (props) => {

  return (<>
    <div>
      <Link to={'dashboard'}>看板</Link>
      <Link to={'group'}>任务组</Link>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path={'/dashboard'} element={<Dashboard/>}/>
        <Route path={'/group'} element={<Group/>}/>
      </Routes>
    </div>
  </>);
};

export default Project;
