"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { linkedin?: string; twitter?: string; github?: string };
  index?: number;
}

export function TeamCard({ name, role, bio, socials, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-elevated">
        <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary-blue to-accent flex items-center justify-center text-white font-heading font-bold text-xl">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <h3 className="font-heading text-lg font-semibold text-primary-text">
          {name}
        </h3>
        <p className="text-sm font-medium text-primary-blue">{role}</p>
        <p className="mt-2 text-sm text-secondary-text leading-relaxed line-clamp-2">
          {bio}
        </p>
        <div className="mt-4 flex items-center gap-3">
          {socials.linkedin && (
            <Link href={socials.linkedin} className="text-secondary-text hover:text-primary-blue transition-colors">
              <Linkedin className="h-4 w-4" />
            </Link>
          )}
          {socials.twitter && (
            <Link href={socials.twitter} className="text-secondary-text hover:text-primary-blue transition-colors">
              <Twitter className="h-4 w-4" />
            </Link>
          )}
          {socials.github && (
            <Link href={socials.github} className="text-secondary-text hover:text-primary-blue transition-colors">
              <Github className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
