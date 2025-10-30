import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";
import { SolidButton } from "@siso/ui";

interface HeroMediaProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export default function HeroMedia({ eyebrow, title, subtitle, imageUrl = "/images/shared/defaults/hero-default.jpg", ctaPrimary, ctaSecondary }: HeroMediaProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt="Restaurant hero" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/80" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-6 py-24 text-center sm:py-28">
        {eyebrow ? (
          <p className="w-fit rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mx-auto max-w-2xl text-lg text-white/85">{subtitle}</p> : null}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {ctaPrimary ? (
            <SolidButton asChild>
              <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
            </SolidButton>
          ) : null}
          {ctaSecondary ? (
            <SolidButton asChild variant="secondary">
              <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
            </SolidButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
