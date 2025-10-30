'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

type SidebarContextValue = {
  collapsed: boolean;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within <SidebarProvider>.');
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = React.useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const value = React.useMemo(() => ({ collapsed, toggle }), [collapsed, toggle]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <aside
        ref={ref}
        data-collapsible={collapsed ? 'icon' : 'expanded'}
        className={cn(
          'group flex w-64 flex-shrink-0 flex-col gap-4 border-r bg-background transition-[width] duration-200',
          collapsed && 'w-20',
          className,
        )}
        {...props}
      />
    );
  },
);
Sidebar.displayName = 'Sidebar';

export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex min-h-screen flex-1 flex-col', className)} {...props} />
  ),
);
SidebarInset.displayName = 'SidebarInset';

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-3 py-4', className)} {...props} />
  ),
);
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-auto px-3 py-4', className)} {...props} />
  ),
);
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 space-y-4 overflow-y-auto px-3 py-4', className)} {...props} />
  ),
);
SidebarContent.displayName = 'SidebarContent';

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  ),
);
SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70',
      className,
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-1', className)} {...props} />
));
SidebarGroupContent.displayName = 'SidebarGroupContent';

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('space-y-1', className)} {...props} />
  ),
);
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('list-none', className)} {...props} />
  ),
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ asChild, className, isActive, tooltip, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!asChild) {
      onClick?.(event);
    }
  };

  return (
    <Comp
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-muted hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary group-data-[collapsible=icon]:justify-center',
        className,
      )}
      data-active={isActive ? 'true' : undefined}
      title={tooltip}
      onClick={handleClick}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { collapsed, toggle } = useSidebarContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) {
        toggle();
      }
    };

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={handleClick}
        {...props}
      >
        {children ?? <Menu className="h-4 w-4" aria-hidden />}
      </button>
    );
  },
);
SidebarTrigger.displayName = 'SidebarTrigger';
