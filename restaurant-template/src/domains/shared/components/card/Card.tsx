
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    variant?: "default" | "elegant" | "glass" | "simple" | "highlight" | "feature" | "menu" | "earth" | "water" | "fire" | "air" 
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      variant === "elegant" && "border-elementree-light/30 shadow-elegant hover:shadow-md transition-shadow duration-300",
      variant === "glass" && "glass-effect backdrop-blur-md bg-white/80 border border-white/20",
      variant === "simple" && "border-none shadow-none",
      variant === "highlight" && "border-elementree-fire/30 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-elementree-light/10",
      variant === "feature" && "border border-elementree-water/20 shadow-blue-glow hover:shadow-blue-glow-lg transition-all duration-300",
      variant === "menu" && "border-elementree-earth/20 hover:border-elementree-earth/40 transition-colors duration-300",
      variant === "earth" && "border-elementree-earth bg-elementree-earth/5 hover:bg-elementree-earth/10 transition-colors duration-300",
      variant === "water" && "border-elementree-water bg-elementree-water/5 hover:bg-elementree-water/10 transition-colors duration-300",
      variant === "fire" && "border-elementree-fire bg-elementree-fire/5 hover:bg-elementree-fire/10 transition-colors duration-300",
      variant === "air" && "border-elementree-air bg-elementree-air/5 hover:bg-elementree-air/10 transition-colors duration-300",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-serif font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children ?? <span className="sr-only">Card title</span>}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
