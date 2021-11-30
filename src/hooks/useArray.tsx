import { useState } from "react";

export default function useArray<T>(initialArray: T[]){
  const [value, setValue] = useState(initialArray);
  const add = (item: T)=>{
      setValue([...value,item])
  }
  const removeIndex = (index: number)=>{
    const copy = [...value]
    copy.splice(index,1)
    setValue(copy)
  }
  const clear = ()=>{
      setValue([])
  }
  return{
    value,
    setValue,
    clear,
    removeIndex,
    add
  }
}