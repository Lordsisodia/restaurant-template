"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Orientation = "horizontal" | "vertical";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation;
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, role, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? undefined : (role ?? "separator")}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";

export { Separator };
