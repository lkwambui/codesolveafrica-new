"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogCard } from "@/components/features/blog-card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";

export function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          subtitle="Insights"
          title="Latest from Our Blog"
          description="Expert perspectives on enterprise technology, digital transformation, and software engineering."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((post, index) => (
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
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
