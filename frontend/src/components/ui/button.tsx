import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-blue text-white hover:bg-primary-blue/90 shadow-sm hover:shadow-md active:scale-[0.97]",
        secondary:
          "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md active:scale-[0.97]",
        outline:
          "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white active:scale-[0.97]",
        ghost:
          "text-secondary-text hover:text-primary-text hover:bg-surface active:scale-[0.97]",
        accent:
          "bg-accent text-white hover:bg-accent/90 shadow-sm hover:shadow-md active:scale-[0.97]",
        "accent-warm":
          "bg-accent-warm text-white hover:bg-accent-warm/90 shadow-sm hover:shadow-md active:scale-[0.97]",
        danger:
          "bg-danger text-white hover:bg-danger/90 shadow-sm hover:shadow-md active:scale-[0.97]",
        link: "text-primary-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
