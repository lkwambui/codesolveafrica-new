import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FAQAccordion } from "@/components/features/faq-accordion";
import { CTASection } from "@/components/home/cta-section";
import { faqs } from "@/data/faqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about CodeSolveAfrica's services, academy, and career opportunities.",
};

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FAQPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <SectionHeader
            subtitle="FAQ"
            title="Frequently Asked Questions"
            description="Find answers to common questions about our services, academy, and more."
          />
          <div className="max-w-3xl mx-auto mt-12">
            <Tabs defaultValue={categories[0]}>
              <TabsList className="mb-8 flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <FAQAccordion
                    faqs={faqs.filter((f) => f.category === category)}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
