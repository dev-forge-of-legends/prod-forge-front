import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  /**
   * Function to call when reaching the bottom of the scrollable element
   */
  onLoadMore: () => void | Promise<void>;
  
  /**
   * Distance from bottom (in pixels) when to trigger the fetch
   * This creates a "trigger zone" before the actual bottom
   * @default 100
   */
  threshold?: number;
  
  /**
   * Whether loading is currently in progress (prevents multiple calls)
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Whether there are more items to load (stops triggering when false)
   * @default true
   */
  hasMore?: boolean;
  
  /**
   * Debounce delay in milliseconds to prevent excessive calls
   * @default 200
   */
  debounceDelay?: number;
  
  /**
   * Root margin for intersection observer (useful for triggering before element is visible)
   * @default "0px"
   */
  rootMargin?: string;
}

/**
 * Custom hook that triggers a fetch function when the bottom of an element becomes visible
 * Works with both scrollable containers and regular divs (using page scroll)
 * Uses Intersection Observer API for better performance and broader compatibility
 * 
 * @param options - Configuration options for the infinite scroll behavior
 * @returns ref - Ref to attach to the container element
 * 
 * @example
 * const [items, setItems] = useState([]);
 * const [loading, setLoading] = useState(false);
 * const [hasMore, setHasMore] = useState(true);
 * 
 * const loadMoreItems = async () => {
 *   setLoading(true);
 *   try {
 *     const newItems = await fetchMoreItems();
 *     setItems(prev => [...prev, ...newItems]);
 *     setHasMore(newItems.length > 0);
 *   } finally {
 *     setLoading(false);
 *   }
 * };
 * 
 * const containerRef = useInfiniteScroll({
 *   onLoadMore: loadMoreItems,
 *   isLoading: loading,
 *   hasMore: hasMore,
 *   threshold: 100
 * });
 * 
 * return (
 *   <div ref={containerRef}>
 *     {items.map(item => <div key={item.id}>{item.name}</div>)}
 *     {loading && <div>Loading...</div>}
 *   </div>
 * );
 */
export const useInfiniteScroll = <T extends HTMLElement = HTMLDivElement>({
  onLoadMore,
  threshold = 100,
  isLoading = false,
  hasMore = true,
  debounceDelay = 200,
  rootMargin = "0px"
}: UseInfiniteScrollOptions) => {
  const containerRef = useRef<T>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const debouncedLoadMore = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onLoadMore();
    }, debounceDelay);
  }, [onLoadMore, debounceDelay]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && !isLoading && hasMore) {
      debouncedLoadMore();
    }
  }, [isLoading, hasMore, debouncedLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create or find the sentinel element (invisible div at the bottom)
    let sentinel = sentinelRef.current;
    
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.style.height = '1px';
      sentinel.style.width = '100%';
      sentinel.style.visibility = 'hidden';
      sentinel.style.position = 'absolute';
      sentinel.style.bottom = `${threshold}px`;
      sentinel.style.pointerEvents = 'none';
      sentinelRef.current = sentinel;
    }

    // Position the sentinel relative to the container
    if (container.style.position === '' || container.style.position === 'static') {
      container.style.position = 'relative';
    }
    
    container.appendChild(sentinel);

    // Create intersection observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null, // Use viewport as root
      rootMargin: rootMargin,
      threshold: 0.1
    });

    observerRef.current.observe(sentinel);

    // Cleanup function
    return () => {
      if (observerRef.current && sentinel) {
        observerRef.current.unobserve(sentinel);
        observerRef.current.disconnect();
      }
      
      if (sentinel && container.contains(sentinel)) {
        container.removeChild(sentinel);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return containerRef;
};
