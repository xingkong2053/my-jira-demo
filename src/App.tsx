import React from 'react';
import './App.css';
import { useAuth } from "./context/auth-context";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./unauthenticated-app";
import ErrorBoundary from "./components/ErrorBoundary";
import { FullPageError } from "./components/lib";

function App() {
  let { user } = useAuth();
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
