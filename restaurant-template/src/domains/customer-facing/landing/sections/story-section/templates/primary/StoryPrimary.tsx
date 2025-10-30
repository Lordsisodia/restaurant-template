"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Clock } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { Badge, SectionHeading } from "@/domains/shared/components";
import type { StoryContent } from "../../types/schema";

const iconMap = {
  sparkles: Sparkles,
  heart: Heart,
  clock: Clock,
} as const;

export default function StoryPrimary({
  title = "Our Story",
  story,
  imageUrl,
  images = [],
  ctaLabel = "Read Our Full Story",
  ctaHref = "/about",
  highlights = [],
  useCarousel = false,
}: StoryContent) {
  const carouselSlides = useCarousel && images.length > 0
    ? images.map((img) => ({
        title: img.title,
        button: img.description ?? ctaLabel,
        src: img.src,
      }))
    : [];

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {useCarousel && carouselSlides.length > 0 ? (
        <div className="space-y-5">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              pillText="Our Story"
              title={title}
              titleClassName="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
              as="h2"
              centered
            />

            {highlights.length > 0 ? (
              <div className="mb-3 flex flex-wrap justify-center gap-2">
                {highlights.slice(0, 2).map((highlight, idx) => {
                  const Icon = highlight.icon ? iconMap[highlight.icon] : null;
                  return (
                    <Badge
                      key={`${highlight.label}-${idx}`}
                      variant="secondary"
                      className="group flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                    >
                      {Icon ? <Icon className="h-3 w-3 text-primary transition-transform group-hover:rotate-12" /> : null}
                      <span>{highlight.label}</span>
                    </Badge>
                  );
                })}
              </div>
            ) : null}

            <p className="text-sm leading-relaxed text-muted-foreground">{story}</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl py-6">
            <Carousel slides={carouselSlides} />
          </div>

          <div className="-mt-8 flex justify-center">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 shadow-xl backdrop-blur-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="group relative aspect-[4/3] overflow-hidden md:aspect-auto">
              <Image
                src={imageUrl ?? images[0]?.src ?? ""}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Discover Our Journey</span>
              </div>

              <SectionHeading
                pillText="Our Story"
                title={title}
                titleClassName="text-2xl sm:text-3xl md:text-4xl font-bold"
                as="h2"
                centered={false}
                className="mb-6"
              />

              <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">{story}</p>

              <Link
                href={ctaHref}
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
