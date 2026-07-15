"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

function CodePattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="20" fontSize="8" fill="currentColor" className="text-primary dark:text-white">&lt;/&gt;</text>
      <text x="40" y="40" fontSize="6" fill="currentColor" className="text-primary dark:text-white">const</text>
      <text x="70" y="15" fontSize="7" fill="currentColor" className="text-primary dark:text-white">fn()</text>
      <text x="25" y="65" fontSize="8" fill="currentColor" className="text-primary dark:text-white">{ }</text>
      <text x="5" y="85" fontSize="6" fill="currentColor" className="text-primary dark:text-white">import</text>
      <text x="55" y="80" fontSize="7" fill="currentColor" className="text-primary dark:text-white">=&gt;</text>
      <text x="75" y="55" fontSize="6" fill="currentColor" className="text-primary dark:text-white">async</text>
      <text x="35" y="10" fontSize="5" fill="currentColor" className="text-primary dark:text-white">null</text>
      <text x="85" y="90" fontSize="5" fill="currentColor" className="text-primary dark:text-white">true</text>
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-blue/10 via-transparent to-transparent dark:from-primary-blue/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent dark:from-accent/10" />

      <CodePattern />

      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary-blue/5 blur-3xl dark:bg-primary-blue/10" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl dark:bg-accent/10" />

      <Container className="relative z-10 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/20 mb-6">
              Africa&apos;s Premier Enterprise Technology Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight tracking-tight dark:text-white"
          >
            Building World-Class
            <br />
            <span className="text-primary-blue">
              Software Solutions
            </span>
            <br />
            From Africa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed dark:text-white/70"
          >
            We partner with enterprises to design, build, and scale digital solutions
            that drive transformation. From custom software to AI-powered platforms,
            we deliver excellence across every project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="xl" className="shadow-lg shadow-primary-blue/25">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="accent" size="xl">
              <Link href="/portfolio">
                <Play className="mr-2 h-5 w-5" />
                View Our Work
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "15+", label: "Projects" },
              { value: "10+", label: "Clients" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-primary dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-secondary-text mt-1 dark:text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
