import type { ReactNode } from 'react';

import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@siso/ui/primitives/sidebars/shadcn-ui-sidebar';

import { AdminProviders, AdminSidebar, AdminTopbar } from '@/domains/client-facing/components/layout';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProviders>
      <SidebarProvider>
        <div className="flex min-h-screen bg-muted/20">
          <Sidebar className="border-r border-border/60 bg-background/95">
            <AdminSidebar />
          </Sidebar>
          <SidebarInset className="flex min-h-screen flex-col bg-background">
            <AdminTopbar />
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="mx-auto w-full max-w-5xl rounded-3xl border border-border/60 bg-background/95 p-6 shadow-sm">
                {children}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AdminProviders>
  );
}
