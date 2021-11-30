import { useCallback, useEffect, useState } from "react";

// https://usehooks.com/
export const useAsync2 = <D>(asyncFunction: ()=>Promise<D>, immediate = true) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState<Error | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    console.log('pending');
    setStatus("pending");
    setData(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        console.log('success');
        setData(response);
        setStatus("success");
      })
      .catch((error) => {
        console.log('error');
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, data, error,isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    isIdle: status === "idle", };
}