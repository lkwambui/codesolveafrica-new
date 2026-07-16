import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { PortfolioFilter } from "@/components/features/portfolio-filter";
import { CTASection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of enterprise software projects across fintech, healthtech, agritech, and more.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <SectionHeader
            subtitle="Our Portfolio"
            title="Projects We're Proud Of"
            description="Discover how we've helped enterprises transform their digital capabilities with innovative solutions."
          />
          <PortfolioFilter />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
