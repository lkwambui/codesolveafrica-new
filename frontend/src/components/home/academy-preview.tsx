"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CourseCard } from "@/components/features/course-card";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

export function AcademyPreview() {
  const featured = courses.slice(0, 3);

  return (
    <section className="py-20 bg-surface dark:bg-primary-800/50">
      <Container>
        <SectionHeader
          subtitle="CodeSolveAfrica Academy"
          title="Accelerate Your Career"
          description="Industry-led courses designed to equip you with in-demand technology skills."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, index) => (
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
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/academy">
              Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
