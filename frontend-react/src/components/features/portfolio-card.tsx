import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryImages: Record<string, string> = {
  FinTech: "/portfolio/fintech.jpg",
  AgriTech: "/portfolio/agritech.jpg",
  IoT: "/portfolio/iot.jpg",
  "Data Analytics": "/portfolio/data-analytics.jpg",
  EdTech: "/portfolio/edtech.jpg",
};

function getCategoryImage(category: string) {
  return categoryImages[category] || "/portfolio/fintech.jpg";
}

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
      <Link to={`/portfolio/${slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-elevated hover:border-primary-blue/20 dark:bg-primary-800 dark:border-white/10">
          <div className="relative h-48 overflow-hidden">
            <img
              src={getCategoryImage(category)}
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant="primary">{category}</Badge>
            </div>
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary-text opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-primary-blue">{client}</p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-primary-text group-hover:text-primary-blue transition-colors dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-secondary-text leading-relaxed line-clamp-2 dark:text-white/60">
              {shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
