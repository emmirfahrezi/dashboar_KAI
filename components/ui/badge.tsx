import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "secondary" | "outline" | "blue";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-[#e8f5ef] text-[#145d47] border-[#cbe8db]",
    blue:
      "bg-[#0e261f] text-[#5fe0b0] border-[#2b5949] shadow-2xs",
    success:
      "bg-emerald-50/85 text-emerald-800 border-emerald-200/80",
    warning:
      "bg-amber-50/85 text-amber-800 border-amber-200/80",
    danger:
      "bg-rose-50/85 text-rose-800 border-rose-200/80",
    secondary:
      "bg-slate-100 text-slate-700 border-slate-200 shadow-2xs",
    outline:
      "border-slate-200 text-slate-700 bg-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-tight transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
