"use client";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { StatsCard } from "@/components/features/stats-card";
import { stats } from "@/data/stats";

export function StatsSection() {
  return (
    <section className="py-20 dark:bg-primary">
      <Container>
        <SectionHeader
          subtitle="By The Numbers"
          title="Trusted by Enterprises Worldwide"
          description="Our track record speaks for itself. Here's what we've achieved working with our clients."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
