"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Palette, Code2, CheckCircle2, Rocket, HeartHandshake, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Search, Palette, Code2, CheckCircle2, Rocket, HeartHandshake,
};

interface TimelineItemProps {
  step: number;
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function TimelineItem({ step, title, description, icon, index }: TimelineItemProps) {
  const Icon = iconMap[icon] || Code2;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={cn(
        "flex items-start gap-6 md:gap-12",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex-1",
        isLeft ? "md:text-right" : "md:text-left"
      )}>
        <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">
          Step {step}
        </span>
        <h3 className="font-heading text-xl font-semibold text-primary-text mt-1 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-secondary-text leading-relaxed dark:text-white/60">{description}</p>
      </div>

      <div className="relative flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-blue text-white shadow-lg">
          <Icon className="h-5 w-5" />
        </div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-border" />
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
