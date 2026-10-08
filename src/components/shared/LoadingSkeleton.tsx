interface LoadingSkeletonProps {
  count?: number;
  height?: string;
}

/**
 * Kept for future asynchronous data sources; the current build reads bundled
 * static JSON synchronously, so nothing renders this yet. The pulse stops under
 * prefers-reduced-motion rather than animating unconditionally.
 */
export function LoadingSkeleton({ count = 3, height = 'h-32' }: LoadingSkeletonProps) {
  return (
    <div className="wl-pad space-y-3 py-6" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${height} animate-pulse motion-reduce:animate-none border border-divider bg-surface`}
        />
      ))}
    </div>
  );
}
