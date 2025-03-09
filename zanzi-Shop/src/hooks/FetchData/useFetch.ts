import { useCallback, useEffect, useState } from "react";

type FetchFunction<T> = (signal: AbortSignal) => Promise<T>;

const useFetch = <T>(
  fetchFn: FetchFunction<T>,
  initialData: T,
  autoFetch: boolean = true
) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(controller.signal);
      if (!controller.signal.aborted) {
        setData(result);
        setHasFetched(true);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        const fetchError =
          error instanceof Error
            ? error
            : new Error("An unknown error occurred");
        setError(fetchError);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
    return () => controller.abort();
  }, [fetchFn]);

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
  return { data, loading, error, fetchData };
};

export default useFetch;
