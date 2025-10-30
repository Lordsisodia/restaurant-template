"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Utensils, ShoppingBasket, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTenant } from "@/providers/TenantProvider";

const BAR_HEIGHT = 56;

export function QuickActionsBar() {
  const pathname = usePathname();
  const tenant = useTenant();

  // Hide on admin/auth routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/sign-")) {
    return null;
  }

  const features = (tenant.siteConfig?.features as Record<string, unknown> | undefined) ?? {};
  const phone = (features.contact as Record<string, string> | undefined)?.phone;
  const whatsapp = (features.contact as Record<string, string> | undefined)?.whatsapp;
  const callHref = phone ? `tel:${phone.replace(/[^+\\d]/g, "")}` : whatsapp ? `https://wa.me/${whatsapp.replace(/[^+\\d]/g, "")}` : "/contact";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Quick actions"
    >
      <nav className="mx-auto grid h-14 max-w-5xl grid-cols-4">
        <QuickAction href="/menu" label="Menu" icon={<Utensils className="h-5 w-5" />} active={pathname === "/menu"} />
        <QuickAction href="/specials" label="Specials" icon={<ShoppingBasket className="h-5 w-5" />} active={pathname === "/specials"} />
        <QuickAction href={callHref} label={whatsapp ? "WhatsApp" : "Call"} icon={<Phone className="h-5 w-5" />} external />
        <QuickAction href="/reservations" label="Reserve" icon={<CalendarDays className="h-5 w-5" />} active={pathname === "/reservations"} />
      </nav>
    </div>
  );
}

function QuickAction({ href, label, icon, active, external }: { href: string; label: string; icon: React.ReactNode; active?: boolean; external?: boolean }) {
  const className = cn(
    "flex flex-col items-center justify-center gap-1 text-[11px] font-medium",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
  );
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {icon}
        <span>{label}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

// Utility for pages to avoid overlap
export const quickActionsBottomPaddingClass = `pb-[calc(${BAR_HEIGHT}px+env(safe-area-inset-bottom))] lg:pb-0`;
