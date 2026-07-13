"use client";

import { Container } from "@/components/ui/container";
import { partners } from "@/data/partners";

export function TrustedBy() {
  const doubledPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-surface border-y border-border overflow-hidden">
      <Container>
        <p className="text-center text-xs font-semibold text-secondary-text uppercase tracking-wider mb-8">
          Trusted by Industry Leaders
        </p>
        <div className="relative">
          <div className="flex gap-16 animate-scroll">
            {doubledPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-12 px-6"
              >
                <span className="font-heading text-lg font-bold text-primary/30 hover:text-primary/50 transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent" />
        </div>
      </Container>
    </section>
  );
}
