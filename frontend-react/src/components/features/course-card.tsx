import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Signal, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const thumbnailImages: Record<string, string> = {
  "full-stack-web-development": "/courses/dev.jpg",
  "ai-machine-learning": "/courses/data-science.jpg",
  "cloud-devops-engineering": "/courses/cloud.jpg",
  "mobile-app-development": "/courses/dev.jpg",
  "data-science-analytics": "/courses/data-science.jpg",
  "cybersecurity-fundamentals": "/courses/cloud.jpg",
};

function getThumbnail(slug: string) {
  return thumbnailImages[slug] || "/courses/dev.jpg";
}

interface CourseCardProps {
  title: string;
  shortDescription: string;
  duration: string;
  level: string;
  price: number;
  currency: string;
  slug: string;
  index?: number;
}

const levelColors: Record<string, "success" | "warning" | "danger"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export function CourseCard({
  title,
  shortDescription,
  duration,
  level,
  price,
  currency,
  slug,
  index = 0,
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/academy/courses/${slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden group-hover:border-primary-blue/30 transition-all dark:bg-primary-800 dark:border-white/10">
          <div className="relative h-40 overflow-hidden">
            <img
              src={getThumbnail(slug)}
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge variant={levelColors[level] || "primary"}>{level}</Badge>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="font-heading text-lg font-bold text-white drop-shadow-sm">
                KSh {price.toLocaleString()}
              </span>
            </div>
          </div>
          <CardContent className="p-5">
            <h3 className="font-heading text-lg font-semibold text-primary-text group-hover:text-primary-blue transition-colors dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-secondary-text line-clamp-2 leading-relaxed dark:text-white/60">
              {shortDescription}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-secondary-text dark:text-white/60">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {duration}
                </span>
                <span className="flex items-center gap-1">
                  <Signal className="h-3.5 w-3.5" /> {level}
                </span>
              </div>
              <span className="inline-flex items-center text-sm font-medium text-primary-blue gap-1 group-hover:gap-2 transition-all">
                View <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
