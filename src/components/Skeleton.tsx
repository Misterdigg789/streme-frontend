"use client";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  circle?: boolean;
}

export function Skeleton({
  width = "w-full",
  height = "h-4",
  className = "",
  circle = false,
}: SkeletonProps) {
  const baseClasses = `bg-base-300 dark:bg-base-600 animate-pulse ${
    circle ? "rounded-full" : "rounded"
  } ${width} ${height} ${className}`;

  return <div className={baseClasses} />;
}

export function SkeletonText({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? "w-3/4" : "w-full"}
          height="h-4"
        />
      ))}
    </div>
  );
}

export function SkeletonTokenCard() {
  return (
    <div className="p-4 border border-base-300 rounded-lg space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton circle width="w-12" height="h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton width="w-1/2" height="h-4" />
          <Skeleton width="w-1/3" height="h-3" />
        </div>
      </div>
      <Skeleton width="w-full" height="h-6" />
      <Skeleton width="w-full" height="h-10" />
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonTokenCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex gap-3">
          {Array.from({ length: cols }).map((_, col) => (
            <Skeleton
              key={`${row}-${col}`}
              width={col === 0 ? "w-1/4" : "w-1/5"}
              height="h-6"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
