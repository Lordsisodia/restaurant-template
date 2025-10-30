"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, MessageSquare, User } from "lucide-react";

export function FloatingNavDemo() {
  const navItems = [
    { name: "Home", link: "/", icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "About", link: "/about", icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "Contact", link: "/contact", icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" /> },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
      <DummyContent />
    </div>
  );
}

function DummyContent() {
  return (
    <div className="relative grid h-[80rem] w-full grid-cols-1 rounded-md border border-neutral-200 bg-white dark:border-white/20 dark:bg-black">
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-neutral-600 dark:text-white">
        Scroll back up to reveal Navbar
      </p>
      <div className="absolute inset-0 bg-grid-black/10 dark:bg-grid-white/20" />
    </div>
  );
}

