"use client";

import * as React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export function TestimonialCard({
  name,
  role,
  company,
  content,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-8 h-full dark:border-white/10 dark:bg-primary-800">
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-warning fill-warning" : "text-border"
            }`}
          />
        ))}
      </div>
      <blockquote className="flex-1 text-sm text-secondary-text leading-relaxed dark:text-white/60">
        &ldquo;{content}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-blue to-accent flex items-center justify-center text-white font-medium text-sm">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary-text dark:text-white">{name}</p>
          <p className="text-xs text-secondary-text dark:text-white/60">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
