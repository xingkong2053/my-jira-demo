import React from "react";
import "./App.css";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./unauthenticated-app";
import ErrorBoundary from "./components/ErrorBoundary";
import { FullPageError } from "./components/lib";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slice/auth.slice";

function App() {
  const { user } = useSelector(selectUser);
  return (
    <div className="">
      {/*
       当页面渲染时发生未捕获错误时渲染 <FullPageError/>
      */}
      <ErrorBoundary fallbackRender={FullPageError}>
        {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
