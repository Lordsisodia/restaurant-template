import type { ReactNode } from "react";

import { RestaurantFooterPro, TenantHeader } from "@/domains/shared/components";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <TenantHeader />
      <main className="flex-1 pt-24 lg:pt-28">{children}</main>
      <RestaurantFooterPro />
    </div>
  );
}
