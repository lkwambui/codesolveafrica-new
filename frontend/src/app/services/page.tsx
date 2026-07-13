import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "@/components/features/service-card";
import { CTASection } from "@/components/home/cta-section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive enterprise technology services including custom software, cloud, AI, cybersecurity, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <SectionHeader
            subtitle="Our Services"
            title="Enterprise Technology Solutions"
            description="End-to-end technology services designed to transform your business and accelerate growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
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
      <CTASection />
    </>
  );
}
