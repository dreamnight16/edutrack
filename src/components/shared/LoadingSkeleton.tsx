interface LoadingSkeletonProps {
  count?: number;
  height?: string;
}

export function LoadingSkeleton({ count = 3, height = 'h-32' }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-background animate-pulse rounded-card border border-primary/10`}
        />
      ))}
    </div>
  );
}
