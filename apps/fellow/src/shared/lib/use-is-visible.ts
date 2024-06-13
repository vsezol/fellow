import { MutableRefObject, RefObject, useEffect, useState } from 'react';

type RefElement = Element | null | undefined;

export const useIsVisible = <
  T extends RefObject<RefElement> | MutableRefObject<RefElement>
>(
  ref: T,
  onVisible?: (isVisible: boolean) => void
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
      onVisible?.(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, onVisible]);

  return isIntersecting;
};
