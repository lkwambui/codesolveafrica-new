'use client';

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/home/cta-section";
import { services, getServiceBySlug } from "@/data/services";
import { Code2, Smartphone, Cloud, Brain, Shield, BarChart3, Building2, GitBranch, Palette, Cable, Zap, Hexagon, Cpu, Database, CheckCircle2 as CheckCircle2Icon, LucideIcon } from "lucide-react";
import { useDocumentTitle } from '@/lib/use-document-title';

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Cloud, Brain, Shield, BarChart3, Building2,
  GitBranch, Palette, Cable, Zap, Hexagon, Cpu, Database, CheckCircle2Icon,
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
  if (!service) return <div>Not Found</div>;
  useDocumentTitle(service.title);

  const Icon = iconMap[service.icon] || Code2;

  return (
    <>
      <section className="pt-28 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-blue/10 text-primary-blue mb-6">
                <Icon className="h-7 w-7" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-text dark:text-white leading-tight">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-secondary-text dark:text-white/60 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text dark:text-white mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-secondary-text dark:text-white/60">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text dark:text-white mb-4">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2 text-sm text-secondary-text dark:text-white/60">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text dark:text-white mb-4">Technology Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text dark:text-white mb-6">Our Process</h2>
                <div className="space-y-6">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-blue text-white text-xs font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-medium text-primary-text dark:text-white">{step.title}</h3>
                        <p className="text-sm text-secondary-text dark:text-white/60 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border dark:border-white/10 bg-white dark:bg-primary-900 p-6 sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-primary-text dark:text-white mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-sm text-secondary-text dark:text-white/60 mb-6">
                  Let&apos;s discuss how our {service.title.toLowerCase()} can help your business.
                </p>
                <Button asChild className="w-full mb-3">
                  <Link to="/contact">
                    Start Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
