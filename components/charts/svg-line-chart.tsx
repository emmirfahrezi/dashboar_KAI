"use client";

import React, { useState } from "react";
import { formatNumber } from "@/lib/utils";

interface SvgLineChartProps<T> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  height?: number;
  width?: number;
  ariaLabel?: string;
  unit?: string;
  zeroBaseline?: boolean;
  valueFormatter?: (val: number) => string;
}

export function SvgLineChart<T>({
  data,
  xKey,
  yKey,
  height = 280,
  width = 680,
  ariaLabel = "Grafik Tren Garis",
  unit = "juta",
  zeroBaseline = false,
  valueFormatter = (val) => formatNumber(val, 2),
}: SvgLineChartProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-xs text-slate-400">
        Tidak ada data yang tersedia
      </div>
    );
  }

  const padding = { top: 25, right: 24, bottom: 45, left: 58 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const numericValues = data.map((d) => Number(d[yKey]));
  const rawMin = Math.min(...numericValues);
  const rawMax = Math.max(...numericValues);

  const minValue = zeroBaseline ? 0 : Math.floor(rawMin * 0.85);
  const maxValue = Math.ceil(rawMax * 1.08);
  const range = maxValue - minValue || 1;

  const getX = (index: number) => {
    if (data.length === 1) return padding.left + innerWidth / 2;
    return padding.left + (index * innerWidth) / (data.length - 1);
  };

  const getY = (val: number) => {
    return padding.top + innerHeight - ((val - minValue) / range) * innerHeight;
  };

  // Generate 5 grid ticks
  const ticks = Array.from({ length: 5 }, (_, i) => {
    const val = minValue + (range * i) / 4;
    return {
      value: val,
      y: getY(val),
    };
  });

  const points = data
    .map((d, i) => `${getX(i).toFixed(1)},${getY(Number(d[yKey])).toFixed(1)}`)
    .join(" ");

  // Gradient area path
  const areaPath = `M ${getX(0)},${getY(Number(data[0][yKey]))} ${data
    .slice(1)
    .map((d, i) => `L ${getX(i + 1)},${getY(Number(d[yKey]))}`)
    .join(" ")} L ${getX(data.length - 1)},${padding.top + innerHeight} L ${getX(
    0
  )},${padding.top + innerHeight} Z`;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="areaGradientBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>
          <filter id="shadowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3.5"
              floodColor="#1d4ed8"
              floodOpacity="0.28"
            />
          </filter>
        </defs>

        {/* Horizontal grid lines and Y-axis labels */}
        {ticks.map((tick, idx) => (
          <g key={idx}>
            <line
              x1={padding.left}
              y1={tick.y}
              x2={width - padding.right}
              y2={tick.y}
              className="stroke-slate-200/70 dark:stroke-slate-800"
              strokeDasharray={idx === 0 ? "none" : "3,3"}
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={tick.y + 3.5}
              textAnchor="end"
              className="fill-slate-400 dark:fill-slate-500 font-mono text-[10px]"
            >
              {formatNumber(tick.value, 0)}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGradientBlue)" />

        {/* Primary Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadowBlue)"
        />

        {/* Data points and X-axis labels */}
        {data.map((d, i) => {
          const cx = getX(i);
          const cy = getY(Number(d[yKey]));
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={i}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Vertical guideline on hover */}
              {isHovered && (
                <line
                  x1={cx}
                  y1={padding.top}
                  x2={cx}
                  y2={padding.top + innerHeight}
                  className="stroke-blue-500/50 dark:stroke-blue-400/40"
                  strokeDasharray="2,2"
                  strokeWidth="1.5"
                />
              )}

              {/* Hover highlight circle */}
              {isHovered && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="9"
                  fill="#2563eb"
                  fillOpacity="0.25"
                  className="animate-ping"
                />
              )}

              {/* Data Point Dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4}
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth={isHovered ? 3.5 : 2.5}
                className="transition-all duration-150"
              />

              {/* X Axis Label */}
              <text
                x={cx}
                y={height - 12}
                textAnchor="middle"
                className={`text-[10px] transition-colors ${
                  isHovered
                    ? "fill-blue-700 font-bold dark:fill-blue-400"
                    : "fill-slate-500 dark:fill-slate-400 font-medium"
                }`}
              >
                {String(d[xKey])}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip when hovered with glassmorphism */}
      {hoveredIndex !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full transform rounded-xl border border-white/80 bg-white/85 px-3 py-2 shadow-xl backdrop-blur-md transition-transform duration-75 dark:border-white/10 dark:bg-slate-900/90"
          style={{
            left: `${(getX(hoveredIndex) / width) * 100}%`,
            top: `${(getY(Number(data[hoveredIndex][yKey])) / height) * 100 - 4}%`,
          }}
        >
          <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
            {String(data[hoveredIndex][xKey])}
          </p>
          <p className="font-mono text-xs font-extrabold text-blue-600 dark:text-blue-400">
            {valueFormatter(Number(data[hoveredIndex][yKey]))} {unit}
          </p>
        </div>
      )}
    </div>
  );
}
