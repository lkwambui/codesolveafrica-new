import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogFilter } from "@/components/features/blog-filter";
import { CTASection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and perspectives on enterprise technology, digital transformation, and software engineering from CodeSolveAfrica.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <SectionHeader
            subtitle="Our Blog"
            title="Insights & Perspectives"
            description="Expert perspectives on enterprise technology, digital transformation, and software engineering."
          />
          <BlogFilter />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
