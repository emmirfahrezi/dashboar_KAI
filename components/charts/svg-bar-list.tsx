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
    <div className="space-y-2.5 py-1">
      {items.map((item, idx) => {
        const isNegative = item.value < 0;
        const widthPercent = Math.min(
          100,
          Math.max(4, (Math.abs(item.value) / maxValue) * 100)
        );

        return (
          <div
            key={idx}
            className="group grid grid-cols-[minmax(85px,1fr)_3fr_65px] items-center gap-3 text-xs"
          >
            {/* Year Label */}
            <div className="truncate font-medium text-slate-600 transition-colors group-hover:text-[#145d47]">
              {item.label}
            </div>

            {/* Bar Track & Fill */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out",
                  isNegative
                    ? "bg-[#e05252]"
                    : "bg-[#145d47] group-hover:bg-[#10755a]"
                )}
                style={{ width: `${widthPercent}%` }}
              />
            </div>

            {/* Percentage Value */}
            <div
              className={cn(
                "text-right font-mono text-xs font-bold tracking-tight",
                isNegative ? "text-slate-800" : "text-slate-800"
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
