"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/domains/shared/components";
import type { PromoContent } from '../../types/schema';

function Pill({ label, tone = "dark" }: { label: string; tone?: "light" | "dark" }) {
  const isLight = tone === "light";
  const baseClass = cn(
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] shadow-sm backdrop-blur",
    isLight ? "border border-white/20 bg-white/10 text-white/85" : "border border-primary/25 bg-primary/10 text-primary",
  );
  const shellClass = cn(
    "relative flex h-1 w-1 items-center justify-center rounded-full",
    isLight ? "bg-white/40" : "bg-primary/40",
  );
  const pingClass = cn(
    "flex h-2 w-2 animate-ping items-center justify-center rounded-full",
    isLight ? "bg-white" : "bg-primary",
  );
  const coreClass = cn(
    "absolute top-1/2 left-1/2 flex h-1 w-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
    isLight ? "bg-white/80" : "bg-primary",
  );

  return (
    <span className={baseClass}>
      <span className={shellClass}>
        <span className={pingClass}>
          <span className={pingClass}></span>
        </span>
        <span className={coreClass}></span>
      </span>
      {label}
    </span>
  );
}

export default function PromoPrimary({
  pillText = 'Now Serving',
  eyebrow,
  title,
  description,
  imageUrl,
  imageAlt,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  badge,
  schedule,
}: PromoContent) {
  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-background/95 px-6 pb-12 pt-16 shadow-xl shadow-primary/10">
      <div className="absolute left-6 top-6">
        <Pill label="Promotions" tone="dark" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[2fr,1.2fr] lg:items-center">
        <div className="space-y-6">
          {eyebrow ? <Pill label={eyebrow} tone="light" /> : null}

          <SectionHeading
            pillText={pillText}
            pillTone="dark"
            title={title}
            subtitle={description}
            centered={false}
            titleClassName="text-3xl md:text-4xl font-semibold"
            className="text-left"
          />

          <div className="flex flex-wrap items-center gap-3">
            {badge ? (
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {badge}
              </div>
            ) : null}
            {schedule ? <p className="text-sm text-muted-foreground">{schedule}</p> : null}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {ctaLabel && ctaHref ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                {ctaLabel}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
            {secondaryCtaLabel && secondaryCtaHref ? (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {secondaryCtaLabel}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </div>

        {imageUrl ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 320px, 100vw"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
