import { useEffect, useState } from "react";

// 添加泛型使传入的值和返回值保持一致
export default function useDebounce<T>(value: T, delay: number): T{
  const [debValue, setDebValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timer = setTimeout(()=> setDebValue(value),delay)
    // 每次在上一个useEffect处理完以后再运行
    return ()=>{
        clearTimeout(timer)
    }
  }, [value]);
  return debValue
}