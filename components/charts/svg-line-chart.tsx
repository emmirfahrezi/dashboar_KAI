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
  height = 270,
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

  const padding = { top: 25, right: 24, bottom: 40, left: 56 };
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
  const ticks = Array.from({ length: 6 }, (_, i) => {
    const val = minValue + (range * i) / 5;
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
          <linearGradient id="areaGradientForest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#145d47" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#145d47" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#145d47" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines and Y-axis labels */}
        {ticks.map((tick, idx) => (
          <g key={idx}>
            <line
              x1={padding.left}
              y1={tick.y}
              x2={width - padding.right}
              y2={tick.y}
              className="stroke-slate-100"
              strokeDasharray={idx === 0 ? "none" : "2,2"}
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={tick.y + 3.5}
              textAnchor="end"
              className="fill-slate-400 font-mono text-[10px]"
            >
              {Math.round(tick.value)}M
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGradientForest)" />

        {/* Primary Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#145d47"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
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
                  className="stroke-[#145d47]/40"
                  strokeDasharray="2,2"
                  strokeWidth="1.5"
                />
              )}

              {/* Data Point Dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 5.5 : 3.8}
                fill="#145d47"
                stroke="#ffffff"
                strokeWidth={isHovered ? 2.5 : 1.8}
                className="transition-all duration-150"
              />

              {/* X Axis Label */}
              <text
                x={cx}
                y={height - 12}
                textAnchor="middle"
                className={`text-[10px] transition-colors ${
                  isHovered
                    ? "fill-[#145d47] font-bold"
                    : "fill-slate-500 font-medium"
                }`}
              >
                {String(d[xKey])}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip when hovered */}
      {hoveredIndex !== null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full transform rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg transition-transform duration-75"
          style={{
            left: `${(getX(hoveredIndex) / width) * 100}%`,
            top: `${(getY(Number(data[hoveredIndex][yKey])) / height) * 100 - 4}%`,
          }}
        >
          <p className="text-[11px] font-semibold text-slate-800">
            Tahun {String(data[hoveredIndex][xKey])}
          </p>
          <p className="font-mono text-xs font-extrabold text-[#145d47]">
            {valueFormatter(Number(data[hoveredIndex][yKey]))} {unit} orang
          </p>
        </div>
      )}
    </div>
  );
}
