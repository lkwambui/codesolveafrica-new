import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { CTASection } from "@/components/home/cta-section";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of enterprise software projects across fintech, healthtech, agritech, and more.",
};

const categories = Array.from(new Set(portfolioItems.map((item) => item.category)));

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <SectionHeader
            subtitle="Our Portfolio"
            title="Projects We're Proud Of"
            description="Discover how we've helped enterprises transform their digital capabilities with innovative solutions."
          />
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-primary-blue text-white">
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-surface text-secondary-text hover:bg-primary-blue/10 hover:text-primary-blue transition-colors cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                title={item.title}
                client={item.client}
                category={item.category}
                shortDescription={item.shortDescription}
                slug={item.slug}
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
