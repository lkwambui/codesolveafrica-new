"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Signal, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      <Link href={`/academy/courses/${slug}`} className="group block h-full">
        <Card className="h-full group-hover:border-primary-blue/30 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant={levelColors[level] || "primary"}>{level}</Badge>
              <span className="font-heading text-xl font-bold text-primary-text">
                KSh {price.toLocaleString()}
              </span>
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary-text group-hover:text-primary-blue transition-colors">
              {title}
            </h3>
            <p className="mt-2 text-sm text-secondary-text line-clamp-2 leading-relaxed">
              {shortDescription}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-secondary-text">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {duration}
              </span>
              <span className="flex items-center gap-1">
                <Signal className="h-3.5 w-3.5" /> {level}
              </span>
            </div>
            <span className={cn(
              "mt-4 inline-flex items-center text-sm font-medium text-primary-blue gap-1",
              "group-hover:gap-2 transition-all"
            )}>
              View Course <ArrowRight className="h-4 w-4" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
