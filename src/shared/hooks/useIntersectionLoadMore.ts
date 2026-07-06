import { RefObject, useEffect } from 'react';

type UseIntersectionLoadMoreOptions = {
  rootRef: RefObject<Element | null>;
  sentinelRef: RefObject<Element | null>;
  enabled: boolean;
  onLoadMore: () => void;
};

/**
 * Gọi `onLoadMore` khi sentinel đi vào vùng nhìn thấy của scroll container.
 */
export const useIntersectionLoadMore = ({
  rootRef,
  sentinelRef,
  enabled,
  onLoadMore,
}: UseIntersectionLoadMoreOptions) => {
  useEffect(() => {
    const root = rootRef.current;
    const sentinel = sentinelRef.current;

    if (!root || !sentinel || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { root, rootMargin: '160px', threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [enabled, onLoadMore, rootRef, sentinelRef]);
};
