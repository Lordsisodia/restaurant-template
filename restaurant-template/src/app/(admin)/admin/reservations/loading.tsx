import { AdminCard } from '@/domains/shared/components/admin/AdminCard';
import { AdminPageHeader } from '@/domains/shared/components/admin/AdminPageHeader';
import { Skeleton } from '@/domains/shared/components';

export default function Loading() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Reservations" subtitle="Loading upcoming bookings…" />
      <AdminCard>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-3">
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
              <Skeleton className="h-5" />
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}

