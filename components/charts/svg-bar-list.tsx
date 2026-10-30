"use client";

import React from "react";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface BarListItem {
  label: string;
  value: number;
  secondaryLabel?: string;
  color?: string;
}

interface SvgBarListProps {
  items: BarListItem[];
  suffix?: string;
  decimals?: number;
  maxCustom?: number;
  highlightHighest?: boolean;
  allowNegative?: boolean;
}

export function SvgBarList({
  items,
  suffix = "",
  decimals = 1,
  maxCustom,
  highlightHighest = false,
  allowNegative = true,
}: SvgBarListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-xs text-slate-400">
        Tidak ada data
      </div>
    );
  }

  const values = items.map((i) => i.value);
  const maxAbs = Math.max(...values.map((v) => Math.abs(v))) || 1;
  const maxValue = maxCustom || maxAbs * 1.05;

  return (
    <div className="space-y-3 py-1">
      {items.map((item, idx) => {
        const isNegative = item.value < 0;
        const widthPercent = Math.min(
          100,
          Math.max(0, (Math.abs(item.value) / maxValue) * 100)
        );
        const isHighest = highlightHighest && idx === 0;

        return (
          <div
            key={idx}
            className="group grid grid-cols-[minmax(110px,1.2fr)_3fr_85px] items-center gap-3 text-xs"
          >
            {/* Label */}
            <div className="truncate font-medium text-slate-700 transition-colors group-hover:text-blue-700 dark:text-slate-300 dark:group-hover:text-blue-400">
              {item.label}
              {item.secondaryLabel && (
                <span className="ml-1 text-[10px] text-slate-400">
                  {item.secondaryLabel}
                </span>
              )}
            </div>

            {/* Bar Track & Fill */}
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/50 backdrop-blur-xs dark:bg-slate-800/60">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out",
                  isNegative
                    ? "bg-rose-500/90 dark:bg-rose-600"
                    : isHighest
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 shadow-xs shadow-blue-500/30"
                    : "bg-gradient-to-r from-blue-600/90 to-blue-500/80 hover:from-blue-600 hover:to-blue-500"
                )}
                style={{ width: `${widthPercent}%` }}
              />
            </div>

            {/* Value */}
            <div
              className={cn(
                "text-right font-mono font-bold tracking-tight",
                isNegative
                  ? "text-rose-600 dark:text-rose-400"
                  : isHighest
                  ? "text-blue-700 dark:text-blue-400 font-extrabold"
                  : "text-slate-800 dark:text-slate-200"
              )}
            >
              {isNegative ? "" : item.value > 0 && allowNegative ? "+" : ""}
              {formatNumber(item.value, decimals)}
              {suffix}
            </div>
          </div>
        );
      })}
    </div>
  );
}
