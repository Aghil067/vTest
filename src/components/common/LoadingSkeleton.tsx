import { cn } from '@/lib/utils';

// ---- Skeleton primitives ----

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton rounded',
        className
      )}
      aria-hidden="true"
    />
  );
}

// ---- Card skeleton ----

export function CardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}

// ---- Card grid skeleton ----

interface CardGridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

export function CardGridSkeleton({ count = 6, columns = 3 }: CardGridSkeletonProps) {
  const gridClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={cn('grid gap-6', gridClass)} aria-busy="true" aria-label="Loading...">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// ---- Hero skeleton ----

export function HeroSkeleton() {
  return (
    <div className="bg-[var(--site-bg)] py-24 px-4" aria-busy="true">
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-4 w-48 bg-navy-700" />
        <Skeleton className="h-14 w-3/4 bg-navy-700" />
        <Skeleton className="h-14 w-1/2 bg-navy-700" />
        <Skeleton className="h-6 w-2/3 bg-[var(--surface)]" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-40 rounded-lg bg-green-700" />
          <Skeleton className="h-12 w-40 rounded-lg bg-navy-700" />
        </div>
      </div>
    </div>
  );
}

// ---- Page skeleton (detail page) ----

export function DetailPageSkeleton() {
  return (
    <div className="space-y-8 py-12 px-4 max-w-5xl mx-auto">
      <div className="space-y-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-2/3" />
      </div>
      <Skeleton className="h-80 w-full rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
