import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TeamCard } from "@/components/features/team-card";
import { StatsSection } from "@/components/home/stats-section";
import { CTASection } from "@/components/home/cta-section";
import { teamMembers } from "@/data/team";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CodeSolveAfrica's mission, values, and leadership team.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <SectionHeader
            subtitle="About Us"
            title="Enterprise Technology, African Innovation"
            description={`${COMPANY.description} We're on a mission to build world-class technology solutions that drive economic growth across the continent.`}
          />
          <div className="max-w-3xl mx-auto mt-12 space-y-6 text-secondary-text leading-relaxed">
            <p>
              Founded in 2010, CodeSolveAfrica has grown from a small team of passionate engineers
              into one of Africa&apos;s leading enterprise technology companies. We partner with organizations
              across the globe to design, build, and scale digital solutions that drive real business impact.
            </p>
            <p>
              Our team of 350+ engineers, designers, and consultants brings together deep technical
              expertise with intimate knowledge of African markets. We understand the unique challenges
              and opportunities of doing business in Africa and build solutions that work in this dynamic environment.
            </p>
            <p>
              We&apos;ve delivered 500+ projects across 50+ countries, serving everything from fast-growing
              startups to Fortune 500 enterprises. Our work spans fintech, healthcare, agriculture,
              telecommunications, and government sectors.
            </p>
          </div>
        </Container>
      </section>

      <StatsSection />

      <section className="py-20 bg-surface">
        <Container>
          <SectionHeader
            subtitle="Leadership"
            title="Meet Our Team"
            description="World-class talent with global experience and local expertise."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} {...member} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader
            subtitle="Our Values"
            title="What Drives Us"
            description="The principles that guide every decision we make and every project we deliver."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Excellence",
                description: "We hold ourselves to the highest standards of quality in everything we deliver.",
              },
              {
                title: "Innovation",
                description: "We continuously push boundaries and embrace new technologies to solve complex challenges.",
              },
              {
                title: "Integrity",
                description: "We build trust through transparency, honesty, and ethical business practices.",
              },
              {
                title: "Collaboration",
                description: "We believe the best solutions emerge from diverse perspectives working together.",
              },
              {
                title: "Impact",
                description: "We measure our success by the tangible value we create for our clients and communities.",
              },
              {
                title: "Growth",
                description: "We invest in our people and constantly learn, adapt, and improve.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center p-6">
                <h3 className="font-heading text-lg font-semibold text-primary-text">{value.title}</h3>
                <p className="mt-2 text-sm text-secondary-text">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
