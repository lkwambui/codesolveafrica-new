"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { portfolioItems } from "@/data/portfolio";

const categories = Array.from(new Set(portfolioItems.map((item) => item.category)));

export function PortfolioFilter() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () => activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActiveCategory("All")}
          className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            activeCategory === "All"
              ? "bg-primary-blue text-white shadow-sm"
              : "bg-surface dark:bg-primary-800 text-secondary-text dark:text-white/60 hover:bg-primary-blue/10 dark:hover:bg-primary-blue/20 hover:text-primary-blue"
          }`}
        >
          All
          <span className="ml-1.5 text-[10px] opacity-70">({portfolioItems.length})</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary-blue text-white shadow-sm"
                : "bg-surface dark:bg-primary-800 text-secondary-text dark:text-white/60 hover:bg-primary-blue/10 dark:hover:bg-primary-blue/20 hover:text-primary-blue"
            }`}
          >
            {cat}
            <span className="ml-1.5 text-[10px] opacity-70">
              ({portfolioItems.filter((i) => i.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item, index) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              client={item.client}
              category={item.category}
              shortDescription={item.shortDescription}
              slug={item.slug}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center text-secondary-text py-12">No projects found in this category.</p>
      )}
    </>
  );
}
