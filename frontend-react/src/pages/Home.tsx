import { useDocumentTitle } from "@/lib/use-document-title";
import { HeroSection } from "@/components/home/hero-section";
import { TrustedBy } from "@/components/home/trusted-by";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { EnterpriseSolutions } from "@/components/home/enterprise-solutions";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { PortfolioPreview } from "@/components/home/portfolio-preview";
import { AcademyPreview } from "@/components/home/academy-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  useDocumentTitle("Home");
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <StatsSection />
      <ServicesGrid />
      <EnterpriseSolutions />
      <WhyChooseUs />
      <ProcessTimeline />
      <PortfolioPreview />
      <AcademyPreview />
      <TestimonialsSection />
      <BlogPreview />
      <CTASection />
    </>
  );
}
