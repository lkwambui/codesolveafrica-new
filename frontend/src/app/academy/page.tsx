import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CourseCard } from "@/components/features/course-card";
import { CTASection } from "@/components/home/cta-section";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Academy",
  description: "CodeSolveAfrica Academy - Industry-led technology courses to accelerate your career.",
};

export default function AcademyPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <SectionHeader
            subtitle="CodeSolveAfrica Academy"
            title="Master In-Demand Tech Skills"
            description="Industry-led courses designed by experts to equip you with the skills that employers are looking for."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                title={course.title}
                shortDescription={course.shortDescription}
                duration={course.duration}
                level={course.level}
                price={course.price}
                currency={course.currency}
                slug={course.slug}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
