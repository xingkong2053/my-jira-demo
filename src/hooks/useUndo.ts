import { useCallback, useReducer } from "react";

type State<T> = {
  past: T[],
  present: T,
  future: T[]
}

type Action<T> = {
  newPresent?: T,
  type: 'undo' | 'redo' | 'set' | 'reset'
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  let { future, past, present } = state;
  switch (action.type) {
    case "undo":
      if(past.length===0) return state
      const previous = past[past.length-1]
      const newPast = past.slice(0,past.length-1)
      return {
        past: newPast,
        present: previous,
        future: [present,...future]
      }
    case "redo":
      if(future.length===0) return state
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past,present],
        present: next,
        future: newFuture
      }
    case "set":
      if(action.newPresent === present) return state
      return {
        past: [...past,present],
        present: present,
        future: []
      }
    case "reset":
      return {
        past: [],
        future: [],
        present: action.newPresent
      }
    default:
      return state
  }
}

export const useUndo = <T>(initialPresent: T) =>{

  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>);

  const canUndo = state.past.length!==0;
  const canRedo = state.future.length!==0;

  const undo = useCallback(()=>dispatch({type: 'undo'}),[])

  const redo = useCallback(() => dispatch({type: 'redo'}), []);

  const set = useCallback((newPresent: T) => dispatch({type: 'set', newPresent}), []);

  const reset = useCallback((newPresent: T) => dispatch({type: 'reset', newPresent}), []);

  return [
    state,
    {undo,redo,set,reset,canUndo,canRedo}
  ]
}