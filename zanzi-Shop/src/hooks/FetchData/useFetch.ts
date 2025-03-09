import { useCallback, useEffect, useState } from "react";

type FetchFunction<T> = (signal: AbortSignal) => Promise<T>;

const useFetch = <T>(
  fetchFn: FetchFunction<T>,
  initialData: T,
  autoFetch: boolean = true,
  maxRetries: number = 3,
  retryDelay: number = 1000
) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    let result: T | undefined
    let fetchError: Error | null = null;
    for (let i = 0; i < maxRetries; i++) {
      try {
        result = await fetchFn(controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
          setHasFetched(true)
          setAttempts(0); // Reset attempts on success
          break; // Exit loop on success
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          fetchError = err instanceof Error ? err : new Error("Unknown error occurred");
          setAttempts((prev) => prev + 1); // Increment attempts
          if (i < maxRetries - 1) {
            // Wait before next retry (skip delay on last attempt)
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      }
    }

    if (!controller.signal.aborted) {
      if (fetchError && attempts >= maxRetries) {
        setError(new Error("Network Error: Max retries exceeded"));
      }
      setLoading(false);
    }

    return () => controller.abort();
  }, [fetchFn, maxRetries, retryDelay, attempts]);

  useEffect(() => {
    if (!autoFetch || hasFetched) return;

    let abort: (() => void) | undefined;
    fetchData().then((abortFn) => {
      abort = abortFn;
    });

    return () => {
      if (abort) abort();
    };
  }, [fetchData, autoFetch, hasFetched]);

  return { data, loading, error, fetchData, attempts };
};

export default useFetch;