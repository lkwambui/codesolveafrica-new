"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/features/newsletter-form";
import { COMPANY } from "@/lib/constants";
import { services } from "@/data/services";

const footerLinks = {
  services: services.slice(0, 6).map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  academy: [
    { label: "All Courses", href: "/academy" },
    { label: "Full-Stack Development", href: "/academy/courses/full-stack-web-development" },
    { label: "AI & Machine Learning", href: "/academy/courses/ai-machine-learning" },
    { label: "Cloud & DevOps", href: "/academy/courses/cloud-devops-engineering" },
    { label: "Data Science", href: "/academy/courses/data-science-analytics" },
  ],
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const socialLinks = [
  { icon: TikTokIcon, href: COMPANY.socials.tiktok, label: "TikTok" },
  { icon: Facebook, href: COMPANY.socials.facebook, label: "Facebook" },
  { icon: Instagram, href: COMPANY.socials.instagram, label: "Instagram" },
  { icon: Youtube, href: COMPANY.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface dark:bg-primary-800/50 dark:border-white/10">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/logo-icon.svg" alt="CodeSolveAfrica" className="h-9 w-9" />
              <span className="font-heading text-xl font-bold text-primary dark:text-white">
                CodeSolve<span className="text-primary-blue">Africa</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-text leading-relaxed max-w-sm dark:text-white/60">
              {COMPANY.description}
            </p>
            <div className="mt-6 space-y-3">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-blue transition-colors dark:text-white/60 dark:hover:text-primary-blue">
                <Mail className="h-4 w-4" /> {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-blue transition-colors dark:text-white/60 dark:hover:text-primary-blue">
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
              <span className="flex items-center gap-2 text-sm text-secondary-text dark:text-white/60">
                <MapPin className="h-4 w-4" /> {COMPANY.address}
              </span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-border text-secondary-text hover:text-primary-blue hover:border-primary-blue/30 transition-all dark:bg-primary-800 dark:border-white/10 dark:text-white/60 dark:hover:text-primary-blue"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-primary-text mb-4 dark:text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text hover:text-primary-blue transition-colors dark:text-white/60 dark:hover:text-primary-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-primary-blue hover:text-primary-blue/80 transition-colors inline-flex items-center gap-1"
                >
                  View All <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-primary-text mb-4 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text hover:text-primary-blue transition-colors dark:text-white/60 dark:hover:text-primary-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-primary-text mb-4 dark:text-white">
              Academy
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.academy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text hover:text-primary-blue transition-colors dark:text-white/60 dark:hover:text-primary-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border dark:border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-heading text-sm font-semibold text-primary-text mb-3 dark:text-white">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-secondary-text mb-4 dark:text-white/60">
                Get the latest insights on enterprise technology delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-text dark:text-white/60">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-secondary-text dark:text-white/60">
            <Link href="/faq" className="hover:text-primary-blue transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-primary-blue transition-colors">Terms of Service</Link>
            <Link href="/faq" className="hover:text-primary-blue transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
