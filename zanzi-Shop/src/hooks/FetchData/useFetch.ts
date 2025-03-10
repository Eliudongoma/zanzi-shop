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
    let localAttempts = 0;
    let result: T | undefined;
    let fetchError: Error | null = null;

    setLoading(true);
    setError(null);

    while (localAttempts < maxRetries) {
      try {
        result = await fetchFn(controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
          setHasFetched(true);
          setAttempts(0); // Reset attempts on success
          setLoading(false);
          return; // Exit on success
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          fetchError = err instanceof Error ? err : new Error("Unknown error occurred");
          localAttempts++;
          setAttempts(localAttempts);

          if (localAttempts < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      }
    }

    if (!controller.signal.aborted) {
      if (fetchError) {
        setError(new Error(`Network Error: Max retries (${maxRetries}) exceeded`));
        console.error(`Max retries (${maxRetries}) reached. Last error:`, fetchError);
      }
      setLoading(false);
    }

    return () => controller.abort();
  }, [fetchFn, maxRetries, retryDelay]); // Removed attempts from deps

  useEffect(() => {
    if (!autoFetch || hasFetched) return;

    let abortFn: (() => void) | undefined;
    const fetchPromise = fetchData();
    fetchPromise.then((cleanup) => {
      abortFn = cleanup;
    });

    return () => {
      if (abortFn) abortFn();
    };
  }, [fetchData, autoFetch, hasFetched]);

  return { data, loading, error, fetchData, attempts };
};

export default useFetch;