import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import type { HeroContent } from '../../types/schema';
import { CalloutCards } from '../../shared/components/CalloutCards';

export default function HeroClassicCenter({
  title,
  subtitle,
  imageUrl = '/images/shared/defaults/hero-default.jpg',
  primaryCta,
  secondaryCta,
}: HeroContent) {
  return (
    <section
      className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden lg:-mt-[80px] lg:min-h-screen"
      style={{ contain: 'layout style paint' }}
    >
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40 sm:bg-gradient-to-b sm:from-black/50 sm:via-black/30 sm:to-black/70" />
      </div>
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col items-center gap-6 px-4 pb-12 pt-20 text-center sm:min-h-screen sm:justify-center sm:px-6 sm:pt-24 lg:min-h-screen">
        <div className="flex flex-col items-center gap-6 sm:flex-1 sm:justify-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl">{title}</h1>
          {subtitle ? (
            <p className="mx-auto max-w-2xl text-xl text-white/90 drop-shadow-md">{subtitle}</p>
          ) : null}
        </div>
        <CalloutCards primaryCta={primaryCta} secondaryCta={secondaryCta} />
      </div>
    </section>
  );
}
