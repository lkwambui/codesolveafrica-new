"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { Button } from "@/components/ui/button";
import { portfolioItems } from "@/data/portfolio";

export function PortfolioPreview() {
  const featured = portfolioItems.slice(0, 3);

  return (
    <section className="py-20 bg-surface dark:bg-primary-800/50">
      <Container>
        <SectionHeader
          subtitle="Our Work"
          title="Featured Projects"
          description="Discover how we've helped enterprises transform their digital capabilities."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, index) => (
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
        <div className="mt-12 text-center">
          <Button asChild variant="accent" size="lg">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
