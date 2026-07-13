import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Signal, DollarSign, CheckCircle2, ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/home/cta-section";
import { courses, getCourseBySlug } from "@/data/courses";

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} - CodeSolveAfrica Academy`,
    description: course.shortDescription,
  };
}

const levelColors: Record<string, "success" | "warning" | "danger"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <>
      <section className="pt-28 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <Breadcrumb
            items={[
              { label: "Academy", href: "/academy" },
              { label: course.title },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={levelColors[course.level]}>{course.level}</Badge>
                <Badge variant="outline">{course.duration}</Badge>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-text leading-tight">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-secondary-text leading-relaxed">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-secondary-text">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration}</span>
                <span className="flex items-center gap-2"><Signal className="h-4 w-4" /> {course.level}</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Max 20 students</span>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Learning Outcomes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2 text-sm text-secondary-text">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-6">Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((module) => (
                    <div key={module.module} className="rounded-xl border border-border bg-white p-5">
                      <h3 className="font-heading font-semibold text-primary-text">
                        Module {module.module}: {module.title}
                      </h3>
                      <ul className="mt-3 space-y-1.5">
                        {module.topics.map((topic) => (
                          <li key={topic} className="text-sm text-secondary-text flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary-blue" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((req) => (
                    <li key={req} className="text-sm text-secondary-text flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-xl border border-border bg-white p-6">
                <h2 className="font-heading text-xl font-semibold text-primary-text mb-4">Instructor</h2>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-blue to-accent flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0">
                    {course.instructor.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-semibold text-primary-text">{course.instructor.name}</p>
                    <p className="text-sm text-primary-blue">{course.instructor.role}</p>
                    <p className="text-sm text-secondary-text mt-1">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-sm text-secondary-text">Course Price</p>
                  <p className="font-heading text-4xl font-bold text-primary-text">
                    KSh {course.price.toLocaleString()}
                  </p>
                </div>
                <Button asChild className="w-full mb-3" size="lg">
                  <Link href="/contact">
                    Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/contact">Request Syllabus</Link>
                </Button>
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-secondary-text">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" /> Certificate of completion
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" /> Hands-on projects
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" /> Mentor support
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" /> Lifetime access
                  </div>
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
