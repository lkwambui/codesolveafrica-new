import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  center = true,
  className,
  dark,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-16",
        center && "mx-auto text-center",
        className
      )}
    >
      {subtitle && (
        <span className={cn(
          "inline-block text-sm font-semibold uppercase tracking-wider mb-3",
          dark ? "text-primary-blue" : "text-primary-blue"
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        "font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
        dark ? "text-white" : "text-primary-text dark:text-white"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-lg leading-relaxed max-w-2xl mx-auto",
          dark ? "text-white/70" : "text-secondary-text dark:text-white/60"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
