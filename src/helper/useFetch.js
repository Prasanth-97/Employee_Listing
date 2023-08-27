import { useState, useCallback, useEffect } from "react";

export function useFetch(url, options, { immediate }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const executeFetch = useCallback(async () => {
    setIsPending(true);
    setData(null);
    setError(null);
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "Authentication Problem") {
          throw new Error("Network response was not ok");
        }
        setData(response);
      })
      .catch((err) => setError(err))
      .finally(() => setIsPending(false));
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
  }, [executeFetch, immediate]);
  return { data, error, isPending, executeFetch };
}
