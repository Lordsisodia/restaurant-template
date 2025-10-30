"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/domains/customer-facing/landing/shared/components/background-gradient";

interface SignatureDishCardProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  description?: string;
  price?: number;
  priceFormatted?: string;
  isSpecial?: boolean;
  deliveryLink?: string;
  prepTime?: number;
  servingSize?: string;
  cuisineType?: string;
  withGradient?: boolean;
}

const SignatureDishCard = forwardRef<HTMLDivElement, SignatureDishCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      description,
      price,
      priceFormatted,
      isSpecial = false,
      deliveryLink,
      prepTime,
      servingSize,
      cuisineType,
      withGradient = false,
      ...props
    },
    ref,
  ) => {
    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      hover: { scale: 1.03, transition: { duration: 0.2 } },
    };

    const buttonVariants = {
      tap: { scale: 0.95 },
    };

    const badgeVariants = {
      initial: { scale: 0 },
      animate: { scale: 1, transition: { delay: 0.3, type: "spring", stiffness: 200 } },
    };

    const priceLabel = priceFormatted ?? (typeof price === "number" ? `Rp ${price.toLocaleString("id-ID")}` : undefined);

    const cardContent = (
      <motion.div
        ref={ref}
        className={cn(
          "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
          className,
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        layout
        {...props}
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {priceLabel ? (
            <motion.div className="absolute right-3 top-3" variants={badgeVariants} aria-label="Price">
              <div className="rounded-full border-2 border-white/20 bg-black/60 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md shadow-lg">
                {priceLabel}
              </div>
            </motion.div>
          ) : null}

          {isSpecial ? (
            <motion.div className="absolute left-3 top-3" variants={badgeVariants}>
              <div className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg">
                ⭐ Chef&apos;s Special
              </div>
            </motion.div>
          ) : null}

          {deliveryLink ? (
            <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 justify-center">
              <motion.a
                href={deliveryLink}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileTap="tap"
                className="translate-y-4 rounded-lg border border-border/50 bg-background/80 px-8 py-2 text-sm font-bold uppercase text-foreground shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Order ${name}`}
              >
                Order Now
              </motion.a>
            </div>
          ) : null}
        </div>

        <div className="flex flex-grow flex-col bg-white p-5 text-left">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="flex-1 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary">
              {name}
            </h3>
            {cuisineType ? (
              <span className="whitespace-nowrap rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {cuisineType}
              </span>
            ) : null}
          </div>

          {description ? (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">{description}</p>
          ) : null}

          {(prepTime || servingSize) ? <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /> : null}

          {(prepTime || servingSize) ? (
            <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
              {prepTime ? (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{prepTime} mins</span>
                </span>
              ) : null}
              {prepTime && servingSize ? <span className="text-gray-300">•</span> : null}
              {servingSize ? (
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  <span>{servingSize}</span>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </motion.div>
    );

    if (withGradient) {
      return (
        <BackgroundGradient containerClassName="h-full w-full" className="h-full w-full">
          {cardContent}
        </BackgroundGradient>
      );
    }

    return cardContent;
  },
);

SignatureDishCard.displayName = "SignatureDishCard";

export { SignatureDishCard };
