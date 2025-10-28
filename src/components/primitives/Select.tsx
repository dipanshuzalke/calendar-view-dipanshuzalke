import React from "react";
import { cn } from "../../utils/cn";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select
      className={cn(
        "px-2 py-1.5 text-sm rounded-md border border-neutral-300 bg-white focus-visible:outline focus-visible:outline-primary-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};
