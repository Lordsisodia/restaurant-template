import { SectionHeading } from '@/domains/shared/components';
import type { HeroContent } from '../../types/schema';

export default function HeroPrimary({ pillText, title, subtitle, backgroundImageUrl }: HeroContent) {
  const headingTitle = (title ?? '').trim() || 'Our Stories';
  const headingSubtitle = (subtitle ?? '').trim();
  const background = backgroundImageUrl ?? '/images/shared/defaults/hero-default.jpg';
  const showSubtitle = headingSubtitle.length > 0;

  return (
    <section className="relative isolate overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/85 to-black" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-2 px-6 py-10 text-center sm:py-12">
        <SectionHeading
          pillText={pillText ?? 'Blog'}
          title={headingTitle}
          subtitle={showSubtitle ? headingSubtitle : undefined}
          centered
          className="flex flex-col items-center gap-2 text-center"
          as="h1"
          titleClassName="text-balance text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
        />
      </div>
    </section>
  );
}
