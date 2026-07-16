'use client';

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { CTASection } from "@/components/home/cta-section";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { useDocumentTitle } from '@/lib/use-document-title';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');
  if (!post) return <div>Not Found</div>;
  useDocumentTitle(post.title);

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <article className="pt-28 pb-20 dark:bg-primary">
        <Container>
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-8"
          />

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">{post.category}</Badge>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-secondary-text dark:text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readingTime}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-surface dark:bg-primary-800">
              <div className="h-12 w-12 rounded-full overflow-hidden relative">
                <img src={post.author.avatar} alt={post.author.name} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="font-semibold text-primary-text dark:text-white">{post.author.name}</p>
                <p className="text-sm text-secondary-text dark:text-white/60">{post.author.role}</p>
              </div>
            </div>

            <div className="mt-8 prose prose-gray max-w-none">
              <p className="text-lg text-secondary-text dark:text-white/60 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-8 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-blue/5 to-accent-warm/5 border border-border dark:border-white/10 relative">
                <img src="/og-image.png" alt={post.title} className="object-cover w-full h-full" />
              </div>
              <div className="mt-8 space-y-4 text-secondary-text dark:text-white/60 leading-relaxed">
                <p>
                  This is where the full blog post content would be displayed. In a production environment,
                  this content would come from a CMS or markdown file. The article would include rich formatting,
                  code snippets, images, and other media elements.
                </p>
                <p>
                  CodeSolveAfrica regularly publishes in-depth articles on enterprise technology topics
                  including software architecture, cloud computing, AI/ML, cybersecurity, and digital
                  transformation strategies.
                </p>
                <p>
                  Our team of experts shares practical insights, lessons learned from real projects,
                  and emerging trends shaping the technology landscape in Africa and globally.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" /> {tag}
                </Badge>
              ))}
            </div>

            <Separator className="my-12" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {prevPost && (
                  <>
                    <span className="text-xs text-secondary-text dark:text-white/60">Previous Article</span>
                    <Link
                      to={`/blog/${prevPost.slug}`}
                      className="flex items-center gap-2 text-sm font-medium text-primary-text dark:text-white hover:text-primary-blue dark:hover:text-primary-blue transition-colors mt-1"
                    >
                      <ArrowLeft className="h-4 w-4" /> {prevPost.title}
                    </Link>
                  </>
                )}
              </div>
              <div className="text-right">
                {nextPost && (
                  <>
                    <span className="text-xs text-secondary-text dark:text-white/60">Next Article</span>
                    <Link
                      to={`/blog/${nextPost.slug}`}
                      className="flex items-center gap-2 text-sm font-medium text-primary-text dark:text-white hover:text-primary-blue dark:hover:text-primary-blue transition-colors mt-1"
                    >
                      {nextPost.title} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </article>
      <CTASection />
    </>
  );
}
