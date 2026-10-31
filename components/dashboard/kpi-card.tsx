import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string;
  foot?: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: React.ReactNode;
  sparklineVariant?: "growth" | "dip" | "peak" | "low";
}

export function KPICard({
  label,
  value,
  foot,
  delta,
  deltaPositive = true,
  icon,
  sparklineVariant,
}: KPICardProps) {
  return (
    <Card className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
      {/* Sparkline background illustration */}
      {sparklineVariant && (
        <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-32 opacity-40">
          <svg
            viewBox="0 0 120 50"
            fill="none"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={`sparkGrad-${sparklineVariant}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#145d47" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#145d47" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {sparklineVariant === "growth" && (
              <>
                <path
                  d="M0,45 Q30,42 60,25 T120,5 L120,50 L0,50 Z"
                  fill={`url(#sparkGrad-${sparklineVariant})`}
                />
                <path
                  d="M0,45 Q30,42 60,25 T120,5"
                  stroke="#145d47"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </>
            )}

            {sparklineVariant === "dip" && (
              <>
                <path
                  d="M0,20 Q40,48 80,15 T120,8 L120,50 L0,50 Z"
                  fill={`url(#sparkGrad-${sparklineVariant})`}
                />
                <path
                  d="M0,20 Q40,48 80,15 T120,8"
                  stroke="#145d47"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </>
            )}

            {sparklineVariant === "peak" && (
              <>
                <path
                  d="M0,38 Q45,35 85,12 T120,4 L120,50 L0,50 Z"
                  fill={`url(#sparkGrad-${sparklineVariant})`}
                />
                <path
                  d="M0,38 Q45,35 85,12 T120,4"
                  stroke="#145d47"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </>
            )}

            {sparklineVariant === "low" && (
              <>
                <path
                  d="M0,15 Q50,5 90,42 T120,45 L120,50 L0,50 Z"
                  fill={`url(#sparkGrad-${sparklineVariant})`}
                />
                <path
                  d="M0,15 Q50,5 90,42 T120,45"
                  stroke="#145d47"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </div>
      )}

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Mint Icon Box */}
          {icon && (
            <div className="mb-3.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#135d47]">
              {icon}
            </div>
          )}

          <div className="text-xs font-semibold text-slate-500">
            {label}
          </div>
          <div className="mt-1 text-2xl sm:text-[26px] font-black tracking-tight text-slate-900">
            {value}
          </div>
        </div>

        <div className="mt-3 pt-1">
          {delta && (
            <div
              className={cn(
                "inline-flex items-center gap-1 text-xs font-bold",
                deltaPositive ? "text-[#135d47]" : "text-rose-600"
              )}
            >
              <span>{delta}</span>
            </div>
          )}

          {foot && !delta && (
            <div className="text-[11px] font-medium text-slate-500">
              {foot}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
