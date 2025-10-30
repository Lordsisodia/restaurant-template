"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemCardProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  isVegetarian?: boolean;
  name: string;
  description?: string;
  price?: number;
  priceFormatted?: string;
  originalPrice?: number;
  quantity?: string;
  prepTimeInMinutes?: number;
  onAdd?: () => void;
}

const MenuItemCard = forwardRef<HTMLDivElement, MenuItemCardProps>(
  (
    {
      className,
      imageUrl,
      isVegetarian = true,
      name,
      description,
      price,
      priceFormatted,
      originalPrice,
      quantity,
      prepTimeInMinutes,
      onAdd,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (value: number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);

    const displayPrice = priceFormatted ?? (typeof price === "number" ? formatPrice(price) : undefined);
    const displayOriginal = typeof originalPrice === "number" ? formatPrice(originalPrice) : undefined;
    const savings =
      typeof price === "number" && typeof originalPrice === "number" && originalPrice > price
        ? formatPrice(originalPrice - price)
        : null;

    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      hover: { scale: 1.03, transition: { duration: 0.2 } },
    };

    const buttonVariants = {
      tap: { scale: 0.95 },
    };

    const vegIconVariants = {
      initial: { scale: 0 },
      animate: { scale: 1, transition: { delay: 0.3, type: "spring", stiffness: 200 } },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative flex w-full max-w-sm flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
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
          <img
            src={imageUrl}
            alt={name}
            className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <motion.div
            className="absolute right-3 top-3"
            variants={vegIconVariants}
            aria-label={isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
          >
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-md border",
                isVegetarian ? "border-green-600 bg-background" : "border-red-600 bg-background",
              )}
            >
              <div className={cn("h-3 w-3 rounded-full", isVegetarian ? "bg-green-600" : "bg-red-600")} />
            </div>
          </motion.div>

          {onAdd ? (
            <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 justify-center">
              <motion.button
                onClick={onAdd}
                variants={buttonVariants}
                whileTap="tap"
                className="translate-y-4 rounded-lg border border-border/50 bg-background/80 px-8 py-2 text-sm font-bold uppercase text-foreground shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Add ${name} to cart`}
              >
                Add
              </motion.button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-grow flex-col p-4 text-left">
          {displayPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">{displayPrice}</span>
              {displayOriginal && savings ? (
                <>
                  <span className="text-sm text-muted-foreground line-through">{displayOriginal}</span>
                  <span className="text-sm font-semibold text-green-500">SAVE {savings}</span>
                </>
              ) : null}
            </div>
          ) : null}

          {quantity ? <p className="mt-1 text-sm text-muted-foreground">{quantity}</p> : null}

          <h3 className="mt-2 text-base font-semibold leading-tight text-foreground">{name}</h3>

          {description ? <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p> : null}

          {prepTimeInMinutes ? (
            <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{prepTimeInMinutes} mins</span>
            </div>
          ) : null}
        </div>
      </motion.div>
    );
  },
);

MenuItemCard.displayName = "MenuItemCard";

export { MenuItemCard };
