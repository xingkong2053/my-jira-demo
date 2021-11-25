import React, { createRef, FormEvent, FunctionComponent } from "react";
import { apiUrl } from "../ProjectList/Index";

interface OwnProps {}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (props) => {

  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  function login(username: string, password: string) {
    fetch(apiUrl+'/login',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({username,password})
    }).then(async res => {
      if (res.ok) {
        console.log(await res.json());
      }
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const username = usernameRef.current?.value as string
    const password = passwordRef.current?.value as string
    login(username,password)
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input type="text" id={'username'} defaultValue={'admin'} ref={usernameRef}/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id={'password'} defaultValue={'123456'} ref={passwordRef}/>
    </div>
    <button type={'submit'}>Login</button>
  </form>;
};

export default Login;
