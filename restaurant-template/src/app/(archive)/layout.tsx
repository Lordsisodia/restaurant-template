import type { ReactNode } from 'react';

import { RestaurantFooterPro, TenantHeader } from '@/domains/shared/components';

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <TenantHeader />
      <main className="flex-1 pt-16 lg:pt-20">
        <div className="border-b border-white/10 bg-white/5 py-6 text-center text-sm font-medium uppercase tracking-[0.4em] text-white/70">
          Planned Feature — Coming Soon
        </div>
        {children}
      </main>
      <RestaurantFooterPro />
    </div>
  );
}
