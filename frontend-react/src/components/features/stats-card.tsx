import * as React from "react";
import CountUpModule from "react-countup";
const CountUp = CountUpModule.default;
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  dark?: boolean;
}

export function StatsCard({ value, suffix, label, description, dark }: StatsCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={cn(
        "text-center p-8 rounded-2xl transition-all duration-300",
        dark
          ? "bg-white/10 border border-white/10 hover:bg-white/15"
          : "bg-white border border-border hover:shadow-elevated dark:bg-primary-800 dark:border-white/10"
      )}
    >
      <div className="font-heading text-4xl md:text-5xl font-bold text-primary-blue dark:text-primary-blue">
        {isVisible ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          "0"
        )}
        <span className="text-accent">{suffix}</span>
      </div>
      <h3 className={cn(
        "mt-2 font-heading text-lg font-semibold",
        dark ? "text-white" : "text-primary-text dark:text-white"
      )}>
        {label}
      </h3>
      <p className={cn(
        "mt-1 text-sm",
        dark ? "text-white/60" : "text-secondary-text dark:text-white/60"
      )}>
        {description}
      </p>
    </div>
  );
}
