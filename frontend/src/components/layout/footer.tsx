"use client";

import Link from "next/link";
import { Linkedin, Twitter, Github, Youtube, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
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

const socialLinks = [
  { icon: Linkedin, href: COMPANY.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: COMPANY.socials.twitter, label: "Twitter" },
  { icon: Github, href: COMPANY.socials.github, label: "GitHub" },
  { icon: Youtube, href: COMPANY.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1 mb-4">
              <span className="font-heading text-xl font-bold text-primary">
                CodeSolve<span className="text-primary-blue">Africa</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-text leading-relaxed max-w-sm">
              {COMPANY.description}
            </p>
            <div className="mt-6 space-y-3">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-blue transition-colors">
                <Mail className="h-4 w-4" /> {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-blue transition-colors">
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
              <span className="flex items-center gap-2 text-sm text-secondary-text">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-border text-secondary-text hover:text-primary-blue hover:border-primary-blue/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-primary-text mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text hover:text-primary-blue transition-colors"
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
            <h3 className="font-heading text-sm font-semibold text-primary-text mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text hover:text-primary-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-primary-text mb-4">
              Academy
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.academy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-text hover:text-primary-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-heading text-sm font-semibold text-primary-text mb-3">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-secondary-text mb-4">
                Get the latest insights on enterprise technology delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-text">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-secondary-text">
            <Link href="/faq" className="hover:text-primary-blue transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-primary-blue transition-colors">Terms of Service</Link>
            <Link href="/faq" className="hover:text-primary-blue transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
