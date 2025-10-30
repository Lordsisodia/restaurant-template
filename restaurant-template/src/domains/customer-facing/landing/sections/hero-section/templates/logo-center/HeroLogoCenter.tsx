import Image from 'next/image';
import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import type { HeroContent } from '../../types/schema';
import { CalloutCards } from '../../shared/components/CalloutCards';

export default function HeroLogoCenter({
  title,
  subtitle,
  imageUrl = '/images/shared/defaults/hero-default.jpg',
  logoUrl,
  primaryCta,
  secondaryCta,
}: HeroContent) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden lg:-mt-[80px]">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-8 px-6 pt-24 text-center">
        {logoUrl ? (
          <div className="relative mb-4 w-full max-w-md">
            <Image
              src={logoUrl}
              alt={title}
              width={600}
              height={200}
              className="h-auto w-full drop-shadow-2xl"
              priority
            />
          </div>
        ) : (
          <h1 className="text-balance text-5xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl">
            {title}
          </h1>
        )}
        {subtitle ? (
          <p className="mx-auto max-w-2xl text-xl text-white/90 drop-shadow-md">{subtitle}</p>
        ) : null}
        <CalloutCards primaryCta={primaryCta} secondaryCta={secondaryCta} />
      </div>
    </section>
  );
}
