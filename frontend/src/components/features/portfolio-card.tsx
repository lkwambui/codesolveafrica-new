"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  title: string;
  client: string;
  category: string;
  shortDescription: string;
  slug: string;
  index?: number;
}

export function PortfolioCard({
  title,
  client,
  category,
  shortDescription,
  slug,
  index = 0,
}: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/portfolio/${slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-elevated hover:border-primary-blue/20 dark:bg-primary-800 dark:border-white/10">
          <div className="flex items-start justify-between">
            <Badge variant="primary">{category}</Badge>
            <ArrowUpRight className="h-5 w-5 text-secondary-text group-hover:text-primary-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
          <h3 className="mt-4 font-heading text-xl font-semibold text-primary-text group-hover:text-primary-blue transition-colors dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-primary-blue">{client}</p>
          <p className="mt-3 text-sm text-secondary-text leading-relaxed line-clamp-2 dark:text-white/60">
            {shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
