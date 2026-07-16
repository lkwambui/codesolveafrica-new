import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { PortfolioFilter } from "@/components/features/portfolio-filter";
import { CTASection } from "@/components/home/cta-section";
import { useDocumentTitle } from '@/lib/use-document-title';

export default function PortfolioPage() {
  useDocumentTitle('Portfolio');
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
