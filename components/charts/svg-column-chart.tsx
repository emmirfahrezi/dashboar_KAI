"use client";

import React, { useState } from "react";
import { formatNumber, formatPercent } from "@/lib/utils";
import { MonthlyRecord } from "@/types/dashboard";
import { Crown, TrendingUp, TrendingDown } from "lucide-react";

interface SvgColumnChartProps {
  data: MonthlyRecord[];
  height?: number;
  width?: number;
}

export function SvgColumnChart({
  data,
  height = 310,
  width = 720,
}: SvgColumnChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-xs text-slate-400">
        Tidak ada data bulanan
      </div>
    );
  }

  // Padding
  const padding = { top: 40, right: 20, bottom: 45, left: 52 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.pass));
  const yCeil = Math.ceil((maxVal * 1.15) / 10) * 10; // Round up to nearest 10

  const slotWidth = innerWidth / data.length;
  const barWidth = Math.min(36, slotWidth * 0.68);

  const getY = (val: number) => {
    return padding.top + innerHeight - (val / yCeil) * innerHeight;
  };

  // 5 horizontal grid ticks
  const ticks = [0, yCeil * 0.25, yCeil * 0.5, yCeil * 0.75, yCeil];

  // Find peak and biggest jump
  const peakItem = data.reduce((a, b) => (a.pass > b.pass ? a : b));

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Grafik Batang Penumpang Bulanan"
      >
        <defs>
          <linearGradient id="barGradientBlueRegular" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#145d47" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1e735a" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="barGradientBluePeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e261f" stopOpacity="1" />
            <stop offset="100%" stopColor="#163f33" stopOpacity="0.95" />
          </linearGradient>
          <filter id="barShadowBlue" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0e261f" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {ticks.map((tickVal, idx) => {
          const y = getY(tickVal);
          return (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                className="stroke-slate-200/70 dark:stroke-slate-800"
                strokeDasharray={idx === 0 ? "none" : "3,3"}
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={y + 3.5}
                textAnchor="end"
                className="fill-slate-400 dark:fill-slate-500 font-mono text-[10px]"
              >
                {Math.round(tickVal)}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, idx) => {
          const xSlotCenter = padding.left + idx * slotWidth + slotWidth / 2;
          const barX = xSlotCenter - barWidth / 2;
          const barY = getY(item.pass);
          const barH = innerHeight - (barY - padding.top);
          const isPeak = item.pass === peakItem.pass;
          const isHovered = hoveredIdx === idx;

          return (
            <g
              key={idx}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Highlight background on hover */}
              {isHovered && (
                <rect
                  x={xSlotCenter - slotWidth / 2 + 2}
                  y={padding.top}
                  width={slotWidth - 4}
                  height={innerHeight}
                  fill="#145d47"
                  fillOpacity="0.08"
                  rx="8"
                />
              )}

              {/* Peak indicator icon & badge above bar (static, clean & elegant) */}
              {isPeak && (
                <g>
                  <rect
                    x={xSlotCenter - 26}
                    y={barY - 24}
                    width="52"
                    height="15"
                    rx="7.5"
                    fill="#0e261f"
                    stroke="#2b5949"
                    strokeWidth="1"
                    className="shadow-xs"
                  />
                  <text
                    x={xSlotCenter}
                    y={barY - 13}
                    textAnchor="middle"
                    fill="#5fe0b0"
                    className="text-[8.5px] font-extrabold tracking-wider"
                  >
                    ★ PUNCAK
                  </text>
                </g>
              )}

              {/* The Vertical Bar */}
              <rect
                x={barX}
                y={barY}
                width={barWidth}
                height={Math.max(4, barH)}
                rx="6"
                fill={
                  isPeak
                    ? "url(#barGradientBluePeak)"
                    : isHovered
                    ? "#0e261f"
                    : "url(#barGradientBlueRegular)"
                }
                filter="url(#barShadowBlue)"
                className="transition-all duration-200"
              />

              {/* Value label on top of bar */}
              <text
                x={xSlotCenter}
                y={isPeak ? barY - 29 : barY - 6}
                textAnchor="middle"
                className={`text-[10px] font-mono font-bold transition-colors ${
                  isPeak
                    ? "fill-[#0e261f] font-extrabold"
                    : isHovered
                    ? "fill-[#145d47]"
                    : "fill-slate-600"
                }`}
              >
                {formatNumber(item.pass, 1)}
              </text>

              {/* X-axis label (Month) */}
              <text
                x={xSlotCenter}
                y={height - 18}
                textAnchor="middle"
                className={`text-[11px] font-semibold transition-colors ${
                  isPeak
                    ? "fill-[#0e261f] font-bold"
                    : isHovered
                    ? "fill-[#145d47] font-bold"
                    : "fill-slate-600"
                }`}
              >
                {item.m}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full transform rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md transition-all duration-75"
          style={{
            left: `${
              ((padding.left +
                hoveredIdx * slotWidth +
                slotWidth / 2) /
                width) *
              100
            }%`,
            top: `${
              (getY(data[hoveredIdx].pass) / height) * 100 - (data[hoveredIdx].isPeak ? 10 : 4)
            }%`,
          }}
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
            {data[hoveredIdx].isPeak && (
              <Crown className="h-3.5 w-3.5 text-[#145d47] fill-[#145d47]" />
            )}
            <span>
              {data[hoveredIdx].fullName} ({data[hoveredIdx].m})
            </span>
          </div>

          <div className="mt-1 font-mono text-sm font-extrabold text-[#145d47]">
            {formatNumber(data[hoveredIdx].pass, 2)} juta penumpang
          </div>

          {data[hoveredIdx].diffFromPrev !== null && data[hoveredIdx].diffFromPrev !== undefined ? (
            <div className="mt-1.5 flex items-center gap-1 text-[11px]">
              <span className="text-slate-500">vs bulan lalu:</span>
              <span
                className={`inline-flex items-center font-bold ${
                  data[hoveredIdx].diffFromPrev! >= 0
                    ? "text-[#145d47]"
                    : "text-rose-600"
                }`}
              >
                {data[hoveredIdx].diffFromPrev! >= 0 ? (
                  <TrendingUp className="mr-0.5 h-3 w-3 inline" />
                ) : (
                  <TrendingDown className="mr-0.5 h-3 w-3 inline" />
                )}
                {data[hoveredIdx].diffFromPrev! >= 0 ? "+" : ""}
                {formatNumber(data[hoveredIdx].diffFromPrev!, 2)} jt (
                {formatPercent(data[hoveredIdx].growthFromPrev!, 1)})
              </span>
            </div>
          ) : (
            <div className="mt-1 text-[10px] text-slate-400 italic">
              Bulan awal periode
            </div>
          )}

          {data[hoveredIdx].isPeak && (
            <div className="mt-1.5 rounded-sm bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
              🏆 Bulan dengan penumpang terbanyak sepanjang tahun!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
