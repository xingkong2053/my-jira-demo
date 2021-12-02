import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "../utils";

/**
 * 返回页面url中，指定键的参数值
 * @param keys
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) =>{
  let [searchParams,setSearchParams] = useSearchParams();
  return [
    // useMemo 避免循环渲染
    useMemo(()=>keys.reduce((prev,key)=> ({...prev,[key]:searchParams.get(key) || ''}),{} as {[key in string]: string | null}),
      [searchParams/* searchParams为state对象，不会导致无限循环 */]),

    (params: Partial<{[key in K]: unknown}>)=>{
      // Object.fromEntries() 方法把键值对列表转换为一个对象。
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
      const o = cleanObject({...Object.fromEntries(searchParams),...params} ) as URLSearchParamsInit
      return setSearchParams(o)
    },
    //清除searchParams中指定的键值对
    <T extends string>(keys: T[])=>{
      const undefinedKeys = keys.reduce((prev,key)=>({...prev,[key]: undefined}),{})
      setSearchParams(cleanObject({...Object.fromEntries(searchParams),...undefinedKeys}) as URLSearchParamsInit)
    }
  ] as const
}