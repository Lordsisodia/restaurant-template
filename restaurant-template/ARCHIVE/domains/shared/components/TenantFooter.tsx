'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';
import { cn } from '@/lib/utils';

import { useTenant } from '@/providers/TenantProvider';

const PAGE_LABELS: Record<string, string> = {
  home: 'Home',
  menu: 'Menu',
  specials: 'Specials',
  orders: 'Orders',
  loyalty: 'Loyalty',
  reviews: 'Reviews',
  chat: 'Chat',
  'gift-cards': 'Gift Cards',
  about: 'About',
  blog: 'Blog',
  contact: 'Contact',
  reservations: 'Reservations',
  order: 'Order Online',
};

function toTitle(label: string) {
  return label
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function TenantFooter() {
  const tenant = useTenant();
  const currentYear = new Date().getFullYear();

  const enabledPages = useMemo(() => {
    const pages = (tenant.siteConfig?.enabled_pages as string[] | undefined) ?? [
      'home',
      'menu',
      'orders',
      'specials',
      'loyalty',
      'reviews',
      'chat',
      'contact',
    ];
    return pages.length > 0
    ? pages
    : ['home', 'menu', 'orders', 'specials', 'loyalty', 'reviews', 'chat', 'contact'];
  }, [tenant.siteConfig?.enabled_pages]);

  const navItems = useMemo(
    () =>
      enabledPages
        .filter((page) => page !== 'home')
        .map((page) => ({
          key: page,
          label: PAGE_LABELS[page] ?? toTitle(page),
          href: page === 'home' ? '/' : `/${page}`,
        })),
    [enabledPages],
  );

  const privacyHref = enabledPages.includes('privacy') ? '/privacy' : '/contact';
  const termsHref = enabledPages.includes('terms') ? '/terms' : '/contact';

  const features = (tenant.siteConfig?.features as Record<string, unknown> | undefined) ?? {};
  const enableOrdering = Boolean(features.onlineOrdering ?? features.enableOnlineOrdering);
  const enableReservations = Boolean(features.reservations ?? features.enableReservations);
  const cta = enableOrdering
    ? { href: '/order', label: 'Order Online' }
    : enableReservations
    ? { href: '/reservations', label: 'Reserve a Table' }
    : { href: '/contact', label: 'Get in Touch' };

  const contactInfo = (features.contact as Record<string, string> | undefined) ?? {};
  const phoneLabel = contactInfo.phone ?? contactInfo.whatsapp ?? undefined;
  const emailLabel = contactInfo.email ?? contactInfo.emailAddress ?? undefined;

  return (
    <footer className="mt-12 border-t border-border/60 bg-muted/40 text-sm text-muted-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[2fr,1fr,1fr]">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-foreground">{tenant.displayName}</p>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground/80">
            Freshly prepared Indonesian flavours, delivered with a modern digital experience. We keep
            your menu, stories, and seasonal specials front and centre.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm" variant="secondary">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
            <span className="inline-flex items-center rounded-md bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground/80">
              Powered by SISO Restaurant Platform
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-md px-1 py-1 transition-colors hover:text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            Contact
          </p>
          <div className="space-y-2 text-sm">
            {phoneLabel ? (
              <a
                href={`tel:${phoneLabel.replace(/[^+\\d]/g, '')}`}
                className="block text-muted-foreground transition hover:text-foreground"
              >
                {phoneLabel}
              </a>
            ) : null}
            {emailLabel ? (
              <a
                href={`mailto:${emailLabel}`}
                className="block text-muted-foreground transition hover:text-foreground"
              >
                {emailLabel}
              </a>
            ) : null}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition hover:border-primary/40 hover:text-foreground"
            >
              Customer Support
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {currentYear} {tenant.displayName}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={privacyHref}
              className={cn(
                'transition-colors hover:text-foreground',
                'text-muted-foreground/70',
              )}
            >
              Privacy Policy
            </Link>
            <Link
              href={termsHref}
              className={cn(
                'transition-colors hover:text-foreground',
                'text-muted-foreground/70',
              )}
            >
              Terms of Service
            </Link>
            <span className="text-muted-foreground/70">Built with ❤️ by SISO Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
