import { AdminPageHeader } from '@/domains/shared/components/admin/AdminPageHeader';
import { AdminCard } from '@/domains/shared/components/admin/AdminCard';
import { Skeleton } from '@/domains/shared/components';

export default function Loading() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Customer reviews" subtitle="Loading reviews…" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <AdminCard key={i}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-16" />
              <div className="grid grid-cols-3 gap-3">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

