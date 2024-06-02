import { DependencyList, useCallback, useEffect } from 'react';

export const useWindowResize = (
  callback: () => void,
  deps: DependencyList = []
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = useCallback(callback, deps);

  useEffect(() => {
    window.addEventListener('resize', handler);

    return () => window?.removeEventListener('resize', handler);
  }, [handler]);
};
