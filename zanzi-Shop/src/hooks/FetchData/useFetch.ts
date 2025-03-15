import axios from "axios";
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
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(()=> {
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    if (isOffline) {
      setError(new Error("You’re offline. Please check your internet connection."));
      setLoading(false);
      controller.abort();
      return;
    }
    let localAttempts = 0;
    while (localAttempts < maxRetries) {
      try {
        const result = await fetchFn(controller.signal);
        if (!controller.signal.aborted) {
          setData(result);
          setLoading(false);
          return;
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError(new Error("Unauthorized: Please log in"));
          setLoading(false);
          return;
        }

        localAttempts++;
        if (localAttempts < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }

    if (!controller.signal.aborted) {
      setError(new Error(`Network Error: Max retries (${maxRetries}) exceeded`));
      setLoading(false);
    }
  }, [fetchFn, maxRetries, retryDelay, isOffline]);

  useEffect(() => {
    if (!autoFetch) return;

    fetchData();
  }, [fetchData, autoFetch]);

  return { data, loading, error, fetchData, isOffline};
};

export default useFetch;