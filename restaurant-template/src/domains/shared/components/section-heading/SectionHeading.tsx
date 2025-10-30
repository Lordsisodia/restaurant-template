"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "../animated-text";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  pillText?: string;
  pillTone?: "light" | "dark";
  pillClassName?: string;
};

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  titleClassName = "text-xl sm:text-2xl font-semibold",
  as = "h2",
  pillText,
  pillTone = "light",
  pillClassName,
}: SectionHeadingProps) {
  const isLightTone = pillTone === "light";
  const pillStyles = cn(
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] shadow-sm backdrop-blur",
    isLightTone
      ? "border border-white/20 bg-white/10 text-white/90"
      : "border border-primary/20 bg-primary/10 text-primary",
    pillClassName,
  );

  const dotShellClass = cn(
    "relative flex h-1 w-1 items-center justify-center rounded-full",
    isLightTone ? "bg-white/40" : "bg-primary/40",
  );

  const dotPulseClass = cn(
    "flex h-2 w-2 animate-ping items-center justify-center rounded-full",
    isLightTone ? "bg-white" : "bg-primary",
  );

  const dotCoreClass = cn(
    "absolute top-1/2 left-1/2 flex h-1 w-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
    isLightTone ? "bg-white/80" : "bg-primary",
  );

  return (
    <div className={className}>
      {pillText ? (
        <div className={centered ? "mb-2 flex justify-center" : "mb-2 flex"}>
          <span className={pillStyles}>
            <div className={dotShellClass}>
              <div className={dotPulseClass}>
                <div className={dotPulseClass}></div>
              </div>
              <div className={dotCoreClass}></div>
            </div>
            {pillText}
          </span>
        </div>
      ) : null}
      <AnimatedText
        text={title}
        as={as}
        textClassName={titleClassName}
        className={centered ? "mb-2" : "mb-2 items-start justify-start"}
        underlineGradient="from-blue-500 via-purple-500 to-pink-500"
        underlineHeight="h-[3px]"
        underlineOffset="mt-1"
      />
      {subtitle ? (
        <p className={`text-sm text-muted-foreground ${centered ? "text-center" : ""} px-2`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
