import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionHeading,
} from '@/domains/shared/components';
import PromoPrimary from '@/domains/customer-facing/landing/sections/promo-section/templates/primary/PromoPrimary';
import type { PromoContent } from '@/domains/customer-facing/landing/sections/promo-section/types/schema';

export const metadata: Metadata = {
  title: 'Promotions | Draco Coffee & Eatery',
  description:
    'Explore the latest line-up of events, tastings, and limited-time offers happening at Draco Coffee & Eatery.',
};

const WEEKLY_LINEUP: PromoContent = {
  pillText: 'Promotions',
  eyebrow: 'Updated October 31, 2025',
  title: 'This Week at Draco',
  description:
    'A curated, always-on rotation of live sessions, chef pairings, and member-only surprises. Every lineup below is refreshed each Friday at 10:00 AM.',
  badge: 'Weekly Series',
  schedule: 'Valid October 31 – November 6, 2025',
  imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80&auto=format&fit=crop',
  imageAlt: 'Evening crowd enjoying cocktails with warm lighting',
  ctaLabel: 'View full calendar',
  ctaHref: '/calendar',
  promotions: [
    {
      day: 'Wednesday',
      title: 'Warm-Up Aperitivo',
      description: 'Complimentary cicchetti bar when you order any vermouth cocktail between 5:00 and 7:00 PM.',
      timeRange: '5:00 – 7:00 PM',
      highlight: 'Chef Pairing',
      perks: ['Members earn 2× points', 'Reservations recommended'],
      imageUrl: 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?w=800&q=80&auto=format&fit=crop',
      imageAlt: 'Small plates and vermouth on a marble bar',
    },
    {
      day: 'Thursday',
      title: 'Lounge Karaoke Live',
      description:
        'House band from 8:00 PM with curated song list and complimentary bar bites between performances.',
      timeRange: '8:00 – 11:00 PM',
      highlight: 'After Dark',
      perks: ['Members skip-the-line check-in', 'Happy hour pricing for the first hour'],
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop',
      imageAlt: 'Singer performing on stage under warm lighting',
      ctaLabel: 'Join guest list',
      ctaHref: 'https://wa.me/6281999777138',
    },
    {
      day: 'Friday',
      title: 'Sunset Espresso Sessions',
      description: 'Resident DJ, espresso martinis, and chef’s snack flights as the sun drops.',
      timeRange: '5:00 PM – Late',
      highlight: 'Resident DJ',
      perks: ['First 20 RSVPs receive welcome pour', 'Complimentary valet for members'],
      imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80&auto=format&fit=crop',
      imageAlt: 'DJ spinning while guests enjoy espresso martinis',
      ctaLabel: 'Reserve via WhatsApp',
      ctaHref: 'https://wa.me/6281999777138',
    },
    {
      day: 'Sunday',
      title: 'Single-Origin Flight',
      description: 'Guided tasting of three roasts with dessert pairing notes in the chef’s garden room.',
      timeRange: '3:00 PM Seating',
      highlight: 'Limited Seats',
      perks: ['12 seats only', 'Complimentary retail beans with membership sign-up'],
      imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80&auto=format&fit=crop',
      imageAlt: 'Coffee flight served on a wooden board',
      ctaLabel: 'Book a seat',
      ctaHref: 'https://wa.me/6281999777138',
    },
  ],
};

const CURATED_COLLECTIONS = [
  {
    title: 'Chef’s Counter Experiences',
    eyebrow: 'Kitchen Studio',
    description:
      'Seven-course tasting menus with rotating guest chefs every second Saturday. Expect wood-fire signatures and tableside stories.',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80&auto=format&fit=crop',
    perks: ['Dedicated sommelier pairing', 'Only 14 seats per seating'],
    ctaLabel: 'Join the waitlist',
    ctaHref: '/reservations',
  },
  {
    title: 'After Dark Takeovers',
    eyebrow: 'Night Program',
    description:
      'Immersive DJ residencies, projection art, and collaborative cocktail labs every Friday night from 9:00 PM.',
    imageUrl: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=900&q=80&auto=format&fit=crop',
    perks: ['Member express lane', 'Complimentary welcome drink before 10:00 PM'],
    ctaLabel: 'See the line-up',
    ctaHref: '/events',
  },
  {
    title: 'Community Sundays',
    eyebrow: 'Daytime Social',
    description:
      'Family-style brunch, acoustic sets, and rotating local makers market. Kids eat free with any adult entrée.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&q=80&auto=format&fit=crop',
    perks: ['Complimentary crafts corner', 'Member picnic kits on request'],
    ctaLabel: 'Plan your table',
    ctaHref: '/reservations',
  },
] as const;

const MEMBER_PERKS = [
  {
    title: '2× Loyalty Points Nights',
    copy: 'Wednesdays and Fridays automatically double earn rates for members — including bottle service and bar tabs.',
  },
  {
    title: 'Member-Only RSVP Windows',
    copy: 'Secure prime seats 48 hours before public release. Applied to chef tables, mixology labs, and ticketed tastings.',
  },
  {
    title: 'Concierge WhatsApp Line',
    copy: 'Need a custom cake, private tasting, or corporate booking? Text +62 819 9977 7138 with your membership ID.',
  },
] as const;

const RSVP_OPTIONS = [
  {
    heading: 'Reserve a Table',
    description: 'Perfect for chef’s counters, tasting flights, and private alcoves.',
    href: '/reservations',
    label: 'Book now',
  },
  {
    heading: 'Talk to the Team',
    description: 'Questions about buyouts or designing a bespoke pairing? We’ll co-create it with you.',
    href: 'mailto:events@dracocoffee.com',
    label: 'Email events',
  },
  {
    heading: 'WhatsApp Concierge',
    description: 'Need quick confirmation or to adjust a reservation? Message the floor manager directly.',
    href: 'https://wa.me/6281999777138',
    label: 'Chat now',
  },
] as const;

export default function PromotionsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:gap-20 lg:py-20">
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-black via-neutral-950 to-zinc-900 px-6 py-14 text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-32 -top-24 h-64 w-64 rounded-full bg-primary/30 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" aria-hidden />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="space-y-8">
              <SectionHeading
                pillText="Promotions"
                pillTone="light"
                title="Events, drops, and late-night energy — refreshed every Friday."
                subtitle="Expect premium coffee activations, chef collaborations, and sonic takeovers. We publish the full calendar every Friday at 10:00 AM and share member-only drops through the concierge channel."
                centered={false}
                titleClassName="text-2xl font-semibold leading-tight md:text-4xl"
                className="text-left text-white max-w-xl"
              />

              <div className="grid gap-4 text-xs font-medium uppercase tracking-[0.18em] text-white/70 sm:grid-cols-3 sm:text-sm">
                <Badge variant="outline" className="border-white/40 bg-white/10 text-white/80 backdrop-blur">
                  Live Lineup · 4 anchors
                </Badge>
                <Badge variant="outline" className="border-white/40 bg-white/10 text-white/80 backdrop-blur">
                  New drops every Friday
                </Badge>
                <Badge variant="outline" className="border-white/40 bg-white/10 text-white/80 backdrop-blur">
                  Member perks layered in
                </Badge>
              </div>

              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                  <span>
                    RSVP windows open every Monday at noon — members receive a 48-hour early access link via WhatsApp concierge.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                  <span>
                    Chef&apos;s counter and tasting seats are extremely limited. We recommend confirming by Tuesday for weekend experiences.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                  <span>
                    Walk-ins welcome for lounge sets and community Sundays — check the live occupancy on our WhatsApp channel.
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/15 bg-white/10">
              <Image
                src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1400&q=80&auto=format&fit=crop"
                alt="Guests enjoying promotions night at Draco Coffee & Eatery"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 100vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Captured · October 24, 2025</p>
                <p className="mt-2 text-lg font-semibold">After Dark takeover, Draco Lounge</p>
                <p className="text-sm text-white/70">Lighting by Studio Nocturne · Mixology lab with 3 guest bartenders · Sold out in 36 hours</p>
              </div>
            </div>
          </div>
        </section>

        <PromoPrimary {...WEEKLY_LINEUP} />

        <section className="space-y-10">
          <SectionHeading
            pillText="Highlighted Programs"
            title="Signature series to plan around"
            subtitle="Anchor happenings that define the Draco experience. Expect seasonal tweaks, surprise collaborators, and dedicated spaces for each program."
            centered={false}
            titleClassName="text-2xl font-semibold leading-tight md:text-4xl"
            className="text-left max-w-3xl"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CURATED_COLLECTIONS.map((collection) => (
              <Card
                key={collection.title}
                className="group relative overflow-hidden border border-border/60 bg-card/90 backdrop-blur transition"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={collection.imageUrl}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 380px, 100vw"
                  />
                </div>
                <CardHeader className="space-y-3">
                  <Badge variant="outline" className="w-fit uppercase tracking-[0.2em] text-[10px] text-muted-foreground">
                    {collection.eyebrow}
                  </Badge>
                  <CardTitle className="text-xl font-semibold md:text-2xl">{collection.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{collection.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {collection.perks.map((perk) => (
                      <li key={`${collection.title}-${perk}`} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={collection.ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                  >
                    {collection.ctaLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <SectionHeading
            pillText="Membership Layer"
            title="Unlock elevated access with Draco Membership"
            subtitle="Members enjoy tiered perks that move with you — from double points to concierge experiences and private RSVP windows."
            centered={false}
            titleClassName="text-2xl font-semibold leading-tight md:text-4xl"
            className="text-left max-w-3xl"
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <Card className="relative overflow-hidden border border-border/60 bg-card/90">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="w-fit uppercase tracking-[0.2em] text-[10px] text-muted-foreground">
                  Benefits snapshot
                </Badge>
                <CardTitle className="text-xl font-semibold md:text-2xl">What membership layers onto Promotions</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Every Promotion Bay drop carries an extra perk for members. Present your digital membership card on arrival
                  to unlock the below layers instantly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {MEMBER_PERKS.map((perk) => (
                    <div
                      key={perk.title}
                      className="rounded-2xl border border-border/60 bg-muted/40 p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Member advantage</p>
                      <p className="mt-2 text-base font-semibold text-foreground">{perk.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{perk.copy}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  Review membership tiers
                  <span aria-hidden>→</span>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border border-primary/30 bg-primary/5">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="w-fit border-primary/60 bg-primary/10 text-primary">
                  Concierge spotlight
                </Badge>
                <CardTitle className="text-xl font-semibold text-primary md:text-2xl">
                  Concierge-crafted experiences
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-primary/90">
                  Planning something larger? The concierge desk designs bespoke pairings, coordinates technical riders for
                  performances, and secures private use of the lounge or garden rooms.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-primary/90">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span>Corporate tastings and brand launches (up to 80 guests)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span>Proposal, birthday, and anniversary takeovers with custom menu cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                    <span>Production support for creators (set design, lighting, content crew)</span>
                  </li>
                </ul>
                <Link
                  href="https://wa.me/6281999777138"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  Message the concierge
                  <span aria-hidden>→</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            pillText="How to RSVP"
            title="Secure your spot"
            subtitle="Choose the channel that suits you. We reply within 30 minutes during operating hours."
            centered={false}
            titleClassName="text-xl font-semibold leading-tight md:text-3xl"
            className="text-left max-w-2xl"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {RSVP_OPTIONS.map((option) => (
              <Card key={option.heading} className="h-full border border-border/60 bg-card/90">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{option.heading}</CardTitle>
                  <CardDescription className="text-sm">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={option.href}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                  >
                    {option.label}
                    <span aria-hidden>→</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
