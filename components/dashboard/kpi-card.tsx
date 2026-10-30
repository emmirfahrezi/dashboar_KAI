import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  foot?: string;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral" | "blue";
  icon?: React.ReactNode;
}

export function KPICard({
  label,
  value,
  foot,
  delta,
  deltaType = "positive",
  icon,
}: KPICardProps) {
  return (
    <Card className="flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/80">
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <span>{label}</span>
          {icon && (
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-100/60 text-blue-600 shadow-2xs dark:bg-blue-950/60 dark:text-blue-400">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
          {value}
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-100/60 dark:border-slate-800/60">
        {foot && (
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {foot}
          </div>
        )}
        {delta && (
          <div>
            <Badge
              variant={
                deltaType === "blue"
                  ? "blue"
                  : deltaType === "positive"
                  ? "success"
                  : deltaType === "negative"
                  ? "danger"
                  : "secondary"
              }
              className="gap-1 px-2.5 py-0.5 text-[11px] font-bold"
            >
              {deltaType === "positive" && <TrendingUp className="h-3 w-3" />}
              {deltaType === "negative" && <TrendingDown className="h-3 w-3" />}
              {deltaType === "neutral" && <Minus className="h-3 w-3" />}
              {delta}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
