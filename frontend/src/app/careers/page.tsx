import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, DollarSign } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTASection } from "@/components/home/cta-section";
import { careers } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join CodeSolveAfrica and help us build world-class enterprise technology solutions from Africa.",
};

const departments = Array.from(new Set(careers.map((c) => c.department)));

export default function CareersPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <SectionHeader
            subtitle="Careers"
            title="Join Our Team"
            description="Help us build world-class enterprise technology solutions from Africa. We're looking for talented individuals passionate about technology and innovation."
          />

          <div className="max-w-3xl mx-auto mt-8 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { value: "350+", label: "Team Members" },
                { value: "15+", label: "Nationalities" },
                { value: "Remote", label: "Work Model" },
                { value: "5", label: "Office Locations" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl font-bold text-primary-blue">{stat.value}</p>
                  <p className="text-xs text-secondary-text dark:text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {departments.map((dept) => {
              const deptCareers = careers.filter((c) => c.department === dept);
              return (
                <div key={dept}>
                  <h2 className="font-heading text-2xl font-semibold text-primary-text dark:text-white mb-6">
                    {dept}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deptCareers.map((career) => (
                      <Link key={career.id} href={`/careers/${career.slug}`} className="group">
                        <Card className="h-full group-hover:border-primary-blue/30 transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <Badge variant="primary">{career.type}</Badge>
                              <ArrowRight className="h-4 w-4 text-secondary-text dark:text-white/60 group-hover:text-primary-blue dark:group-hover:text-primary-blue group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="font-heading text-lg font-semibold text-primary-text dark:text-white group-hover:text-primary-blue dark:group-hover:text-primary-blue transition-colors">
                              {career.title}
                            </h3>
                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-secondary-text dark:text-white/60">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" /> {career.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5" /> {career.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5" /> {career.salary}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-surface dark:bg-primary-800/50">
        <Container>
          <SectionHeader
            subtitle="Life at CodeSolveAfrica"
            title="Why Work With Us?"
            description="We foster a culture of innovation, growth, and impact."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Remote-First", description: "Work from anywhere. We trust our team to deliver excellence, no matter where they are." },
              { title: "Growth Focus", description: "Annual learning budget, conference attendance, and continuous learning opportunities." },
              { title: "Impactful Work", description: "Build solutions that drive real change across Africa and beyond." },
              { title: "Diverse Team", description: "350+ colleagues from 15+ nationalities bringing diverse perspectives." },
              { title: "Great Benefits", description: "Competitive compensation, equity, health coverage, and home office setup budget." },
              { title: "Innovation Time", description: "Dedicated time for innovation projects, open source contributions, and R&D." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <h3 className="font-heading text-lg font-semibold text-primary-text dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary-text dark:text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
