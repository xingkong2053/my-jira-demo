import React, { createRef, FormEvent, FunctionComponent } from "react";
import { useAuth } from "../context/auth-context";

interface OwnProps {}

type Props = OwnProps;

const Regsiter: FunctionComponent<Props> = (props) => {

  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  let { register, user } = useAuth();


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const username = usernameRef.current?.value as string
    const password = passwordRef.current?.value as string
    register({username,password})
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input type="text" id={'username'} defaultValue={'admin'} ref={usernameRef}/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id={'password'} defaultValue={'admin'} ref={passwordRef}/>
    </div>
    <button type={'submit'}>Register</button>
  </form>;
};

export default Regsiter;
