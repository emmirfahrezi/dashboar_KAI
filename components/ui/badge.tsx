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
      "bg-blue-50/80 text-blue-700 border-blue-200/70 backdrop-blur-xs dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60",
    blue:
      "bg-blue-600/90 text-white border-blue-400/50 shadow-xs shadow-blue-500/20 backdrop-blur-xs dark:bg-blue-500/90",
    success:
      "bg-emerald-50/85 text-emerald-800 border-emerald-200/80 backdrop-blur-xs dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
    warning:
      "bg-amber-50/85 text-amber-800 border-amber-200/80 backdrop-blur-xs dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60",
    danger:
      "bg-rose-50/85 text-rose-800 border-rose-200/80 backdrop-blur-xs dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60",
    secondary:
      "bg-white/60 text-slate-700 border-white/80 shadow-2xs backdrop-blur-xs dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/60",
    outline:
      "border-blue-200/70 text-blue-700 bg-white/40 backdrop-blur-xs dark:border-blue-800 dark:text-blue-300 dark:bg-slate-900/40",
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
