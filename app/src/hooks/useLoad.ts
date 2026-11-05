import { useCallback, useEffect, useState } from 'react';

/**
 * Loads data when mounted, or as soon as it is enabled
 * @param load - loading function, must be stable between renders
 * @param enabled - false postpones the loading
 */
const useLoad = <T>(load: () => Promise<T>, enabled = true) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let ignore = false;
    setStatus('loading');

    load()
      .then((loaded) => {
        if (!ignore) {
          setData(loaded);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error');
        }
      });

    return () => { ignore = true; };
  }, [load, enabled, attempt]);

  const retry = useCallback(() => setAttempt((prev) => prev + 1), []);

  return { data, setData, status, retry };
};

export default useLoad;
