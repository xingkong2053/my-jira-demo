import { useEffect, useState } from "react";

export default function useDebounce(value: any, delay: number){
  const [debValue, setDebValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timer = setTimeout(()=> setDebValue(value),delay)
    // 每次在上一个useEffect处理完以后再运行
    return ()=>{
        clearTimeout(timer)
    }
  }, [debValue]);
  return debValue
}