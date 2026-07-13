"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Smartphone, Cloud, Brain, Shield, BarChart3, Building2, GitBranch, Palette, Cable, Zap, Hexagon, Cpu, Database, CheckCircle2, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Cloud, Brain, Shield, BarChart3, Building2,
  GitBranch, Palette, Cable, Zap, Hexagon, Cpu, Database, CheckCircle2,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
  index?: number;
}

export function ServiceCard({ title, description, icon, slug, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/services/${slug}`} className="group block h-full">
        <Card className="h-full p-6 group-hover:border-primary-blue/30 transition-all">
          <CardContent className="p-0">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary-text group-hover:text-primary-blue transition-colors">
              {title}
            </h3>
            <p className="mt-2 text-sm text-secondary-text leading-relaxed line-clamp-2">
              {description}
            </p>
            <span className={cn(
              "mt-4 inline-flex items-center text-sm font-medium text-primary-blue gap-1",
              "group-hover:gap-2 transition-all"
            )}>
              Learn More <ArrowRight className="h-4 w-4" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
