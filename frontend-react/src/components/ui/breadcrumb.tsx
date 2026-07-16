import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-sm text-secondary-text", className)}
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary-blue transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-primary-blue transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-primary-text font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
