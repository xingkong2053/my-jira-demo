import { useEffect, useRef } from "react";


// 修改页面标签标题
export const useTitle = (title: string, keepOnUnmount: boolean = false) => {
  const oldTitle = useRef(document.title).current;
  useEffect(()=>{
    document.title = title
  },[title])
  useEffect(()=>{
    return ()=>{
      // 组件卸载时调用
      if(!keepOnUnmount){
        document.title = process.env.APP_NAME || 'Jira项目管理工具'
      }
    }
  },[keepOnUnmount,oldTitle])
}