import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogCard } from "@/components/features/blog-card";
import { CTASection } from "@/components/home/cta-section";
import { blogPosts, blogCategories } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and perspectives on enterprise technology, digital transformation, and software engineering from CodeSolveAfrica.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white">
        <Container>
          <SectionHeader
            subtitle="Our Blog"
            title="Insights & Perspectives"
            description="Expert perspectives on enterprise technology, digital transformation, and software engineering."
          />
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-primary-blue text-white">
              All
            </span>
            {blogCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-surface text-secondary-text hover:bg-primary-blue/10 hover:text-primary-blue transition-colors cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
                slug={post.slug}
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
