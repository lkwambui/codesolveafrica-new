import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  slug: string;
  authorName: string;
  authorAvatar: string;
  index?: number;
}

export function BlogCard({
  title,
  excerpt,
  category,
  publishedAt,
  readingTime,
  slug,
  authorName,
  authorAvatar,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${slug}`} className="group block">
        <div className="rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-elevated hover:border-primary-blue/20 dark:bg-primary-800 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="primary">{category}</Badge>
            <ArrowUpRight className="h-4 w-4 text-secondary-text group-hover:text-primary-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-primary-text group-hover:text-primary-blue transition-colors leading-snug dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-secondary-text line-clamp-2 leading-relaxed dark:text-white/60">
            {excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
              <img src={authorAvatar} alt={authorName} className="object-cover w-full h-full" />
            </div>
            <span className="text-xs text-secondary-text dark:text-white/60">{authorName}</span>
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-secondary-text">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
