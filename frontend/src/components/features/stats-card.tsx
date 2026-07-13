"use client";

import * as React from "react";
import CountUp from "react-countup";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface StatsCardProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export function StatsCard({ value, suffix, label, description }: StatsCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className="text-center p-8 rounded-2xl bg-white border border-border hover:shadow-elevated transition-all duration-300"
    >
      <div className="font-heading text-4xl md:text-5xl font-bold text-primary-blue">
        {isVisible ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          "0"
        )}
        <span className="text-accent">{suffix}</span>
      </div>
      <h3 className="mt-2 font-heading text-lg font-semibold text-primary-text">
        {label}
      </h3>
      <p className="mt-1 text-sm text-secondary-text">{description}</p>
    </div>
  );
}
