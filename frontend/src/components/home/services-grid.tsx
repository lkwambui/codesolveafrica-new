"use client";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "@/components/features/service-card";
import { services } from "@/data/services";

export function ServicesGrid() {
  const featuredServices = services.slice(0, 6);

  return (
    <section className="py-20 bg-surface">
      <Container>
        <SectionHeader
          subtitle="What We Do"
          title="Enterprise Technology Services"
          description="From strategy to execution, we deliver end-to-end technology solutions that transform businesses."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.shortDescription}
              icon={service.icon}
              slug={service.slug}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
