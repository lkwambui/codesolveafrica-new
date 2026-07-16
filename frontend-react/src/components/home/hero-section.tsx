import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Star, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-white to-primary-blue/5 dark:from-primary dark:via-primary-800 dark:to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-blue/20 via-accent-warm/5 to-transparent dark:from-primary-blue/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-warm/10 via-transparent to-transparent dark:from-accent-warm/15" />

      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-primary-blue/10 blur-3xl dark:bg-primary-blue/20" />
      <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-accent-warm/10 blur-3xl dark:bg-accent-warm/15" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <HeroBackground />

      <Container className="relative z-10 pt-20 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-accent-warm/10 text-accent-warm border border-accent-warm/20 mb-6">
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
              <span className="text-accent-warm">
                Software Solutions
              </span>
              <br />
              From Africa
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-secondary-text max-w-xl leading-relaxed dark:text-white/70"
            >
              We partner with enterprises to design, build, and scale digital solutions
              that drive transformation. From custom software to AI-powered platforms,
              we deliver excellence across every project.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <Button asChild size="xl" className="shadow-lg shadow-primary-blue/25">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="accent-warm" size="xl">
                <Link to="/portfolio">
                  <Play className="mr-2 h-5 w-5" />
                  View Our Work
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
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

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero/hero-team.jpg"
                alt="CodeSolveAfrica team collaborating"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white dark:bg-primary-800 p-4 shadow-lg border border-border dark:border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-text dark:text-white">250+ Engineers</p>
                  <p className="text-xs text-secondary-text dark:text-white/60">Ready to build</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 rounded-xl bg-white dark:bg-primary-800 p-3 shadow-lg border border-border dark:border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-warm/10 text-accent-warm">
                  <Star className="h-4 w-4 fill-accent-warm" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-text dark:text-white">4.9/5</p>
                  <p className="text-[10px] text-secondary-text dark:text-white/60">Client Rating</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 rounded-xl bg-white dark:bg-primary-800 p-3 shadow-lg border border-border dark:border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue/10 text-primary-blue">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-text dark:text-white">500+</p>
                  <p className="text-[10px] text-secondary-text dark:text-white/60">Projects</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
