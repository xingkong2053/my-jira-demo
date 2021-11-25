import React, { ChangeEvent, FunctionComponent } from "react";
import { Param } from "./Index";

export interface User{
  id?: string;
  name?: string;
}

interface OwnProps {
  users: User[]
  param: User,
  setParam: React.Dispatch<Param>
}

type Props = OwnProps;



const SearchPanel: FunctionComponent<Props> = (props) => {

  let { param, setParam, users} = props;


  const handleInput = (e: ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    setParam({
      ...param,
      name: e.target.value
    })
  }

  function selectChange(e: ChangeEvent<HTMLSelectElement>) {
    setParam({...param,personId: +e.target.value})
  }

  return (<div>
    <div>
      <input type="text" value={param.name} onChange={handleInput}/>
      <select value={param.id} onChange={selectChange}>
        <option value="">负责人</option>
        {users.map(u=> <option value={u.id} key={u.id}>{u.name}</option>)}
      </select>
    </div>
  </div>);
};

export default SearchPanel;
