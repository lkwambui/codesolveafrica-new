import * as React from "react";
import { useCountUp } from "react-countup";
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
  const countUpRef = React.useRef<HTMLSpanElement>(null) as React.RefObject<HTMLElement>;
  const hasStarted = React.useRef(false);

  const { start } = useCountUp({
    ref: countUpRef,
    end: value,
    duration: 2.5,
    separator: ",",
    startOnMount: false,
  });

  React.useEffect(() => {
    if (isVisible && !hasStarted.current) {
      hasStarted.current = true;
      start();
    }
  }, [isVisible, start]);

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
        <span ref={countUpRef}>0</span>
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
