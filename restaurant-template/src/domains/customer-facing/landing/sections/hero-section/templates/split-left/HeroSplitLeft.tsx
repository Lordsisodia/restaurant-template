import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import type { HeroContent } from '../../types/schema';
import { CalloutCards } from '../../shared/components/CalloutCards';

export default function HeroSplitLeft({
  title,
  subtitle,
  imageUrl = '/images/shared/defaults/hero-default.jpg',
  primaryCta,
  secondaryCta,
}: HeroContent) {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden lg:-mt-[80px]">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/10" />
      </div>

      <div className="mx-auto grid min-h-[70vh] w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 pt-24 text-left lg:grid-cols-2">
        <div className="order-2 text-center text-white lg:order-1 lg:text-left">
          <h1 className="text-balance text-5xl font-bold tracking-tight drop-shadow-lg sm:text-6xl">{title}</h1>
          {subtitle ? <p className="mt-3 text-lg text-white/90 drop-shadow">{subtitle}</p> : null}
          <div className="mx-auto lg:mx-0">
            <CalloutCards primaryCta={primaryCta} secondaryCta={secondaryCta} />
          </div>
        </div>
        <div className="order-1 hidden lg:order-2 lg:block" />
      </div>
    </section>
  );
}
