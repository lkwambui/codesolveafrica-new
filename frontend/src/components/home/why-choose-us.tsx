"use client";

import { motion } from "framer-motion";
import { Globe, Users, Award, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const features = [
  {
    icon: Globe,
    title: "Global Standards, Local Expertise",
    description: "World-class engineering practices combined with deep understanding of African markets and challenges.",
  },
  {
    icon: Users,
    title: "Elite Team",
    description: "350+ top-tier engineers, designers, and consultants with experience at leading global technology companies.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "500+ successful projects across 50+ countries, serving Fortune 500 companies and innovative startups.",
  },
  {
    icon: Zap,
    title: "Agile Delivery",
    description: "Rapid iteration and continuous delivery ensure you see progress every two weeks.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant processes, end-to-end encryption, and rigorous security protocols.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock support with dedicated account managers and technical teams.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          subtitle="Why CodeSolveAfrica"
          title="Built Different. Built Better."
          description="We combine global expertise with local insight to deliver enterprise solutions that exceed expectations."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary-text">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-secondary-text leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
