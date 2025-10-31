"use client";

import { motion } from 'motion/react';
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
    <section className="relative isolate min-h-screen overflow-hidden lg:-mt-[80px] lg:min-h-[90vh]">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 text-left lg:grid-cols-[1.1fr,0.9fr] lg:pb-24">
        <div className="order-2 flex flex-col gap-6 text-white lg:order-1 lg:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-4xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg text-white/85 drop-shadow"
            >
              {subtitle}
            </motion.p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            <CalloutCards primaryCta={primaryCta} secondaryCta={secondaryCta} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 hidden h-full w-full items-center justify-center lg:order-2 lg:flex"
        >
          <div className="relative h-[460px] w-full max-w-md overflow-hidden rounded-[40px] border border-white/20 bg-white/10 backdrop-blur-xl">
            <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
