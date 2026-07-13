"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Package, Briefcase, Landmark, KanbanSquare, LineChart, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { enterpriseSolutions } from "@/data/enterprise-solutions";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Users, Package, Briefcase, Landmark, KanbanSquare, LineChart,
};

export function EnterpriseSolutions() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          subtitle="Enterprise Solutions"
          title="Integrated Management Systems"
          description="Comprehensive enterprise platforms designed for African businesses, with offline capabilities and mobile-first design."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enterpriseSolutions.map((solution, index) => {
            const Icon = iconMap[solution.icon] || Package;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-border bg-white p-6 hover:shadow-elevated hover:border-primary-blue/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="accent">Enterprise</Badge>
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary-text group-hover:text-primary-blue transition-colors">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                  {solution.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {solution.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-secondary-text">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              Explore All Solutions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
