import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary-blue/10 text-primary-blue dark:bg-primary-blue/20",
        secondary: "bg-primary/10 text-primary dark:bg-white/10 dark:text-white/80",
        accent: "bg-accent/10 text-accent dark:bg-accent/20",
        success: "bg-success/10 text-success dark:bg-success/20",
        warning: "bg-warning/10 text-warning dark:bg-warning/20",
        danger: "bg-danger/10 text-danger dark:bg-danger/20",
        outline: "border border-border text-secondary-text dark:border-white/20 dark:text-white/60",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
