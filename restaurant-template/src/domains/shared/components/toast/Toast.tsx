'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

// Simple in-app toast primitives with no external dependencies.
// These are intentionally minimal – they just render styled containers
// that work with the existing toast state machine in use-toast.ts.

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-auto sm:right-4 sm:top-auto sm:bottom-4 sm:items-end', className)}
      {...props}
    />
  ),
);
ToastViewport.displayName = 'ToastViewport';

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, open = true, onOpenChange, ...props }, ref) => (
  <div
    ref={ref}
    role="status"
    aria-live="polite"
    data-open={open ? 'true' : 'false'}
    className={cn(
      'pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border border-border bg-background/95 p-4 shadow-xl transition-all data-[open=false]:opacity-0 data-[open=false]:translate-y-2',
      className,
    )}
    {...props}
  />
));
Toast.displayName = 'Toast';

export const ToastTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm font-semibold text-foreground', className)} {...props} />
  ),
);
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
);
ToastDescription.displayName = 'ToastDescription';

export const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, children = '×', ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn('ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground', className)}
      onClick={(event) => {
        onClick?.(event);
        props['data-open'] === 'false' ? null : onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  ),
);
ToastClose.displayName = 'ToastClose';

export const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn('inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90', className)}
      {...props}
    >
      {children}
    </button>
  ),
);
ToastAction.displayName = 'ToastAction';

export type ToastActionElement = React.ReactElement<typeof ToastAction>;
