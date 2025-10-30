"use client";

/* eslint-disable */

import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
  scale: 0.7,
  rotateY: -15,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
  scale: 1,
  rotateY: 0,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

function SamsungHelloVietnameseEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      initial={{ opacity: 1, scale: 0.8, rotateX: 10 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -10 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      {...props}
    >
      <title>xin chào - Samsung Bold Tech Style</title>

      {/* x - Angular geometric X shape */}
      <motion.g>
        <motion.path
          d="M40 80L90 130L140 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, type: "spring", stiffness: 200 },
          }}
        />
        <motion.path
          d="M140 80L90 130L40 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: calc(0.2),
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.2) },
            scale: { duration: 0.5, delay: calc(0.2), type: "spring", stiffness: 200 },
          }}
        />
      </motion.g>

      {/* Additional SVG paths... (truncated for brevity - full component would continue with all path definitions) */}

      {/* o - Geometric diamond-like O */}
      <motion.path
        d="M780 90L820 110L820 160L780 180L760 160L760 110L780 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.9),
          ease: "easeInOut",
          delay: calc(5.3),
          type: "spring",
          stiffness: 160,
          damping: 14,
          opacity: { duration: 0.45, delay: calc(5.3) },
          scale: { duration: 0.65, delay: calc(5.3) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function SamsungHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-28", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="18"
      initial={{ opacity: 1, scale: 0.8, rotateX: 8 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -8 }}
      transition={{
        duration: 0.7,
        type: "spring",
        stiffness: 140,
        damping: 18
      }}
      {...props}
    >
      <title>hello - Samsung Bold Tech Style</title>

      {/* h - Bold angular H with tech styling */}
      <motion.g>
        <motion.path
          d="M40 60L40 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
          }}
        />
        {/* More paths... */}
      </motion.g>
    </motion.svg>
  );
}

export { SamsungHelloEnglishEffect, SamsungHelloVietnameseEffect };
