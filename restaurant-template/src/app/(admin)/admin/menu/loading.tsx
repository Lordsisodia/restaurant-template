import { AdminPageHeader } from '@/domains/shared/components/admin/AdminPageHeader';
import { AdminCard } from '@/domains/shared/components/admin/AdminCard';
import { Skeleton } from '@/domains/shared/components';

export default function Loading() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Menu items" subtitle="Loading categories and dishes…" />
      <AdminCard>
        <div className="flex items-end gap-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-9 w-24" />
        </div>
      </AdminCard>
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <AdminCard key={i}>
            <div className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}

