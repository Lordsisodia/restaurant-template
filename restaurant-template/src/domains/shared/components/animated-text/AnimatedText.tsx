"use client";

import * as React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  duration?: number;
  delay?: number;
  replay?: boolean;
  className?: string;
  textClassName?: string;
  underlineClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  underlineGradient?: string;
  underlineGradientCss?: string;
  underlineHeight?: string;
  underlineOffset?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      duration = 0.02,
      delay = 0.03,
      replay = true,
      className,
      textClassName,
      underlineClassName,
      as: Component = "h1",
      underlineGradient = "from-blue-500 via-purple-500 to-pink-500",
      underlineGradientCss,
      underlineHeight = "h-2",
      underlineOffset = "mt-1",
      ...props
    },
    ref,
  ) => {
    const letters = Array.from(text);
    const prefersReduced = useReducedMotion();
    const enableAnimation = replay && !prefersReduced;

    const container: Variants = {
      hidden: {
        opacity: 0,
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: i * delay,
        },
      }),
    };

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200,
        },
      },
    };

    const lineVariants: Variants = {
      hidden: {
        scaleX: 0,
      },
      visible: {
        scaleX: 1,
        transition: {
          delay: letters.length * delay,
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2 w-full", className)}
        {...props}
      >
        <Component className="sr-only" aria-hidden={false}>
          {text}
        </Component>
        <div className="inline-block" aria-hidden>
          <motion.div
            style={{ display: "flex", overflow: "hidden" }}
            variants={container}
            initial={enableAnimation ? "hidden" : "visible"}
            animate={enableAnimation ? "visible" : "visible"}
            className={cn(
              "text-2xl sm:text-3xl md:text-4xl font-bold text-center whitespace-nowrap",
              textClassName
            )}
          >
            {letters.map((letter, index) => (
              <motion.span key={index} variants={child}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Underline as a normal block (more robust across layouts) */}
          <motion.div
            variants={lineVariants}
            initial={enableAnimation ? "hidden" : "visible"}
            animate={enableAnimation ? "visible" : "visible"}
            className={cn(
              "w-full origin-left will-change-transform bg-gradient-to-r rounded-full",
              underlineHeight,
              underlineOffset,
              underlineGradient,
              underlineClassName
            )}
            style={{
              backgroundImage:
                underlineGradientCss ||
                "linear-gradient(to right, #3b82f6, #a855f7, #ec4899)",
            }}
          />
        </div>
      </div>
    );
  }
);
AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
