"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const closeNav = () => {
    setIsOpen(false);
    setExpandedMenus([]);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-text hover:bg-surface transition-colors dark:text-white dark:hover:bg-white/5"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNav}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/60"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-modal dark:bg-primary-800 dark:shadow-modal-dark"
            >
              <div className="flex items-center justify-between p-4 border-b border-border dark:border-white/10">
                <Link href="/" className="font-heading text-xl font-bold text-primary" onClick={closeNav}>
                  CodeSolve<span className="text-primary-blue">Africa</span>
                </Link>
                <button
                  onClick={closeNav}
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface transition-colors dark:hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="overflow-y-auto p-4 h-[calc(100vh-73px)]">
                <ul className="space-y-1">
                  {mainNavigation.map((item) => (
                    <li key={item.label}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleMenu(item.label)}
                            className="flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-primary-text hover:bg-surface transition-colors dark:text-white dark:hover:bg-white/5"
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-secondary-text transition-transform dark:text-white/60",
                                expandedMenus.includes(item.label) && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {expandedMenus.includes(item.label) && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-4"
                              >
                                {item.children.map((child) => (
                                  <li key={child.label}>
                                    <Link
                                      href={child.href}
                                      onClick={closeNav}
                                      className={cn(
                                          "block px-3 py-2 rounded-lg text-sm transition-colors",
                                        pathname === child.href
                                          ? "text-primary-blue font-medium bg-primary-blue/5 dark:bg-primary-blue/20"
                                          : "text-secondary-text hover:text-primary-text hover:bg-surface dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5"
                                      )}
                                    >
                                      {child.label}
                                      {child.description && (
                                        <span className="block text-xs text-secondary-text mt-0.5 dark:text-white/40">
                                          {child.description}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeNav}
                          className={cn(
                            "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.href
                              ? "text-primary-blue bg-primary-blue/5 dark:bg-primary-blue/20"
                              : "text-primary-text hover:bg-surface dark:text-white dark:hover:bg-white/5"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border space-y-3 dark:border-white/10">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/contact" onClick={closeNav}>
                      Get Started
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="/contact" onClick={closeNav}>
                      Book Consultation
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
