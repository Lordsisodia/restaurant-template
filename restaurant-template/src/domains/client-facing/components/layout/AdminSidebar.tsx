'use client';
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  CalendarClock,
  ClipboardList,
  FileText,
  Gift,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Star,
  UtensilsCrossed,
  Wallet,
} from 'lucide-react';

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@siso/ui/primitives/sidebars/shadcn-ui-sidebar';

import { useTenant } from '@/providers/TenantProvider';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Orders', href: '/admin/orders', icon: ClipboardList },
  { label: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Specials', href: '/admin/specials', icon: Star },
  { label: 'Reservations', href: '/admin/reservations', icon: CalendarClock },
  { label: 'Gift Cards', href: '/admin/gift-cards', icon: Gift },
  { label: 'Loyalty', href: '/admin/loyalty', icon: Wallet },
  { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper },
  { label: 'Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Chat Assistant', href: '/admin/chat-assistant', icon: Bot },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const tenant = useTenant();

  return (
    <>
      <SidebarHeader className="h-16 border-b border-border/60 px-4">
        <div className="flex h-full items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {tenant.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-0.5 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-foreground">{tenant.displayName}</p>
            <p className="text-xs text-muted-foreground/80">Restaurant Admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs tracking-[0.18em] text-muted-foreground/70">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.exact ? pathname === item.href : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                      <Link href={item.href} className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                        <Icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 px-4 py-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg bg-muted/70 p-3 text-xs leading-relaxed text-muted-foreground">
          Need a hand?{' '}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact support
          </Link>{' '}
          or review the{' '}
          <Link href="/docs" className="font-medium text-primary hover:underline">
            training guide
          </Link>
          .
        </div>
      </SidebarFooter>
    </>
  );
}
