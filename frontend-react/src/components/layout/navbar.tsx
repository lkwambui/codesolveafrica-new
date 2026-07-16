import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/providers/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";
import { useScroll } from "@/hooks/use-scroll";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrolled } = useScroll(20);
  const location = useLocation();
  const pathname = location.pathname;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm dark:bg-primary/80 dark:border-white/10"
          : "bg-transparent dark:bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="CodeSolveAfrica" className="h-8 w-8" />
            <span className="font-heading text-lg font-bold text-primary dark:text-white">
              CodeSolve<span className="text-primary-blue">Africa</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      pathname.startsWith(item.href) && item.href !== "/"
                        ? "text-primary-blue"
                        : "text-primary-text hover:text-primary-blue hover:bg-surface dark:text-white/80 dark:hover:text-primary-blue dark:hover:bg-white/5"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-block",
                      pathname === item.href
                        ? "text-primary-blue bg-primary-blue/5"
                        : "text-primary-text hover:text-primary-blue hover:bg-surface dark:text-white/80 dark:hover:text-primary-blue dark:hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute top-full left-0 mt-1 rounded-xl border border-border bg-white shadow-elevated p-2 dark:bg-primary-800 dark:border-white/10",
                        item.children.length > 8 ? "w-[520px]" : "w-72"
                      )}
                    >
                      <div className={cn(item.children.length > 8 ? "grid grid-cols-3 gap-1" : "space-y-1")}>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className={cn(
                              "flex flex-col px-3 py-2 rounded-lg transition-colors",
                              pathname === child.href
                                ? "bg-primary-blue/5 text-primary-blue"
                                : "hover:bg-surface text-primary-text dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
                            )}
                          >
                            <span className="text-sm font-medium leading-tight">{child.label}</span>
                            {child.description && (
                              <span className="text-[11px] text-secondary-text mt-0.5 leading-tight">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary-text hover:text-primary-text hover:bg-surface transition-colors dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button asChild size="sm">
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
