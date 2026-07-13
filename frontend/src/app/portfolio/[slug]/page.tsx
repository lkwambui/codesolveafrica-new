import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Star, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/home/cta-section";
import { portfolioItems, getPortfolioItemBySlug } from "@/data/portfolio";

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} - Portfolio`,
    description: item.shortDescription,
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <section className="pt-28 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <Breadcrumb
            items={[
              { label: "Portfolio", href: "/portfolio" },
              { label: item.title },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="primary">{item.category}</Badge>
                <span className="text-sm text-secondary-text">{item.client}</span>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-text leading-tight">
                {item.title}
              </h1>
              <p className="mt-4 text-lg text-secondary-text leading-relaxed">
                {item.description}
              </p>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">The Challenge</h2>
                <p className="text-secondary-text leading-relaxed">{item.challenge}</p>
              </div>

              <div className="mt-8">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Our Solution</h2>
                <p className="text-secondary-text leading-relaxed">{item.solution}</p>
              </div>

              {item.testimonial && (
                <div className="mt-10 rounded-2xl border border-border bg-white p-8">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-warning fill-warning" />
                    ))}
                  </div>
                  <blockquote className="text-base text-primary-text leading-relaxed">
                    &ldquo;{item.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-semibold text-primary-text">{item.testimonial.author}</p>
                    <p className="text-sm text-secondary-text">{item.testimonial.role}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-6 sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-primary-text mb-5">Results</h3>
                <div className="space-y-4">
                  {item.results.map((result) => (
                    <div key={result.metric} className="text-center p-4 rounded-xl bg-surface">
                      <p className="font-heading text-2xl font-bold text-primary-blue">{result.value}</p>
                      <p className="text-xs text-secondary-text">{result.metric}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-primary-text mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/contact">
                      Start Similar Project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/portfolio">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
