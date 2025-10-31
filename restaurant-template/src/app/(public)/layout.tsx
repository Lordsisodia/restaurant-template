import type { ReactNode } from "react";

import { RestaurantFooterPro, TenantHeader } from "@/domains/shared/components";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <TenantHeader />
      <main className="flex-1 pt-16 lg:pt-20">
        <div className="-mt-16 lg:-mt-20">{children}</div>
      </main>
      <RestaurantFooterPro />
    </div>
  );
}
