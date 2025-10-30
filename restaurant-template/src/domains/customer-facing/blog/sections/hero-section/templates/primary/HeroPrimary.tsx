import { SectionHeading } from '@/domains/shared/components';
import type { HeroContent } from '../../types/schema';

export default function HeroPrimary({ pillText, title, subtitle, backgroundImageUrl }: HeroContent) {
  const headingTitle = (title ?? '').trim() || 'Our Stories';
  const headingSubtitle =
    (subtitle ?? '').trim() ||
    "Sip the latest from Draco Coffee & Eatery—menu drops, events, and community spotlights we think you'll love.";
  const background = backgroundImageUrl ?? '/images/shared/defaults/hero-default.jpg';

  return (
    <section className="relative isolate min-h-[500px] overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/85 to-black" />

      <div className="mx-auto flex min-h-[500px] w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        <SectionHeading
          pillText={pillText ?? 'Blog'}
          title={headingTitle}
          subtitle={headingSubtitle}
          centered
          as="h1"
          titleClassName="text-balance text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
        />
      </div>
    </section>
  );
}
