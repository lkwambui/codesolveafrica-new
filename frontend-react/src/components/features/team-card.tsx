import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="currentColor" stroke="white" strokeWidth="0.5" />
    </svg>
  );
}

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { tiktok?: string; facebook?: string; instagram?: string; youtube?: string };
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
      <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-elevated dark:bg-primary-800 dark:border-white/10">
        <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary-blue to-accent flex items-center justify-center text-white font-heading font-bold text-xl">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
        <h3 className="font-heading text-lg font-semibold text-primary-text dark:text-white">
          {name}
        </h3>
        <p className="text-sm font-medium text-primary-blue">{role}</p>
        <p className="mt-2 text-sm text-secondary-text leading-relaxed line-clamp-2 dark:text-white/60">
          {bio}
        </p>
        <div className="mt-4 flex items-center gap-3">
          {socials.tiktok && (
            <Link to={socials.tiktok} className="text-secondary-text hover:text-primary-blue transition-colors">
              <TikTokIcon className="h-4 w-4" />
            </Link>
          )}
          {socials.facebook && (
            <Link to={socials.facebook} className="text-secondary-text hover:text-primary-blue transition-colors">
              <FacebookIcon className="h-4 w-4" />
            </Link>
          )}
          {socials.instagram && (
            <Link to={socials.instagram} className="text-secondary-text hover:text-primary-blue transition-colors">
              <InstagramIcon className="h-4 w-4" />
            </Link>
          )}
          {socials.youtube && (
            <Link to={socials.youtube} className="text-secondary-text hover:text-primary-blue transition-colors">
              <YoutubeIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
