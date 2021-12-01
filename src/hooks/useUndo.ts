import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) =>{
  // const [past, setPast] = useState<T[]>([]);
  // const [present, setPresent] = useState(initialPresent);
  // const [future, setFuture] = useState<T[]>([]);

  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past:[],
    present:initialPresent,
    future:[]
  });

  const canUndo = state.past.length!==0;
  const canRedo = state.future.length!==0;


  const undo = useCallback(()=>{
    setState(prevState=>{
      const {past,present,future} =prevState
      if(past.length===0) return prevState

      const previous = past[past.length-1]
      const newPast = past.slice(0,past.length-1)

      return {
        past: newPast,
        present: previous,
        future: [present,...future]
      }
    })
  },[])

  const redo = useCallback(() => {
    setState(prevState=>{
      const {future, past, present} = prevState
      if(future.length===0) return prevState

      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: [...past,present],
        present: next,
        future: newFuture
      }
    })
  }, []);

  const set = useCallback((newPresent: T) => {
    setState(prevState=>{
      const {past, present} = prevState
      if(newPresent === present) return prevState
      return {
        past: [...past,present],
        present: present,
        future: []
      }
    })
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(()=>{
      return {
        past: [],
        future: [],
        present: newPresent
      }
    })
  }, []);

  return [
    state,
    {undo,redo,set,reset,canUndo,canRedo}
  ]
}