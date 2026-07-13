import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  center = true,
  className,
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
        <span className="inline-block text-sm font-semibold text-primary-blue uppercase tracking-wider mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-secondary-text leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
