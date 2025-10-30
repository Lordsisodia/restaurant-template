'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

type WithAsChild<T> = T & { asChild?: boolean };

export const NavigationMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn('relative flex items-center', className)} {...props} />
));
NavigationMenu.displayName = 'NavigationMenu';

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
));
NavigationMenuList.displayName = 'NavigationMenuList';

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('list-none', className)} {...props} />
));
NavigationMenuItem.displayName = 'NavigationMenuItem';

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  WithAsChild<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    />
  );
});
NavigationMenuLink.displayName = 'NavigationMenuLink';

export const NavigationMenuIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} aria-hidden className="hidden" {...props} />);
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

export const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('hidden', className)} {...props} />
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';
