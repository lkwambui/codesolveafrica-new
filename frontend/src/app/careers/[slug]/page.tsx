import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { CTASection } from "@/components/home/cta-section";
import { ApplicationForm } from "@/components/features/application-form";
import { careers, getCareerBySlug } from "@/data/careers";

export async function generateStaticParams() {
  return careers.map((career) => ({ slug: career.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) return {};
  return {
    title: `${career.title} - Careers`,
    description: career.description,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) notFound();

  return (
    <>
      <section className="pt-28 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <Breadcrumb
            items={[
              { label: "Careers", href: "/careers" },
              { label: career.title },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="primary">{career.type}</Badge>
                <Badge variant="outline">{career.department}</Badge>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-text leading-tight">
                {career.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-secondary-text">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {career.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" /> {career.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" /> {career.salary}
                </span>
              </div>

              <p className="mt-6 text-lg text-secondary-text leading-relaxed">
                {career.description}
              </p>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {career.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-secondary-text">
                      <CheckCircle2 className="h-4 w-4 text-primary-blue mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {career.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-secondary-text">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {career.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-secondary-text">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-6 sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-primary-text mb-4">
                  Apply for this Position
                </h3>
                <p className="text-sm text-secondary-text mb-6">
                  Ready to join our team? Submit your application and we&apos;ll get back to you within 5-7 business days.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href={`/careers/${career.slug}#apply`}>
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/careers">
                      <ArrowLeft className="mr-2 h-4 w-4" /> All Openings
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          <div id="apply">
            <h2 className="font-heading text-2xl font-bold text-primary-text mb-8 text-center">
              Apply for {career.title}
            </h2>
            <div className="max-w-2xl mx-auto">
              <ApplicationForm position={career.title} />
            </div>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
