import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "subtle";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-300",
    secondary:
      "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100",
    subtle: "text-neutral-600 hover:bg-neutral-100",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
