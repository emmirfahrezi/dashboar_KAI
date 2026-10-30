"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SvgColumnChart } from "@/components/charts/svg-column-chart";
import { SvgBarList } from "@/components/charts/svg-bar-list";
import { SvgLineChart } from "@/components/charts/svg-line-chart";
import { getMonthlyDataForYear, getQuarterData } from "@/data/kai-passenger-data";
import { Award, TrendingUp, Calendar, BarChart3, LineChart } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export function MonthlyCharts() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [chartType, setChartType] = useState<"column" | "line">("column");

  const monthlyData = getMonthlyDataForYear(selectedYear);
  const quarterData = getQuarterData(monthlyData);

  // Peak month
  const peakMonth = monthlyData.reduce((a, b) => (a.pass > b.pass ? a : b));
  // Month with highest positive increase
  const monthsWithDiff = monthlyData.filter(
    (d) => d.diffFromPrev !== null && d.diffFromPrev !== undefined
  );
  const highestSurge = monthsWithDiff.reduce((a, b) =>
    (a.diffFromPrev || 0) > (b.diffFromPrev || 0) ? a : b
  );

  // Items for MoM Increase Bar List
  const momItems = monthsWithDiff.map((d) => ({
    label: `${d.fullName} (${d.m})`,
    value: d.diffFromPrev || 0,
    secondaryLabel: `(${d.growthFromPrev !== null && d.growthFromPrev !== undefined && d.growthFromPrev > 0 ? "+" : ""}${formatNumber(d.growthFromPrev || 0, 1)}%)`,
  }));

  const quarterItems = quarterData.map((q) => ({
    label: q.label,
    value: q.pass,
  }));

  return (
    <div className="space-y-5">
      {/* Year & Chart Style Switcher with Glassmorphism */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/75 bg-white/70 p-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Tahun Analisis Bulanan:</span>
          <div className="inline-flex rounded-xl border border-white/80 bg-slate-100/70 p-1 backdrop-blur-xs dark:border-white/10 dark:bg-slate-800/70">
            {[2026, 2025, 2024].map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  selectedYear === year
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 dark:bg-blue-600"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Model Visualisasi:</span>
          <div className="inline-flex rounded-xl border border-white/80 bg-slate-100/70 p-1 backdrop-blur-xs dark:border-white/10 dark:bg-slate-800/70">
            <button
              type="button"
              onClick={() => setChartType("column")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                chartType === "column"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 dark:bg-blue-600"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <BarChart3 className="h-3 w-3" />
              <span>Bar Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("line")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                chartType === "line"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 dark:bg-blue-600"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <LineChart className="h-3 w-3" />
              <span>Garis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar Chart: Monthly Volume & Peak Analysis */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">
                Grafik Batang Penumpang per Bulan ({selectedYear})
              </CardTitle>
              <CardDescription>
                Menjawab kapan penumpang paling banyak: Puncak tertinggi tahun {selectedYear} tercatat di bulan{" "}
                <strong className="text-blue-700 dark:text-blue-400 font-bold">
                  {peakMonth.fullName} ({formatNumber(peakMonth.pass, 2)} juta)
                </strong>
                .
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-sky-300/80 bg-sky-50/80 px-3.5 py-1 text-xs font-bold text-sky-900 shadow-2xs backdrop-blur-xs dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-300">
              <Award className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              <span>Puncak: {peakMonth.fullName}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {chartType === "column" ? (
            <SvgColumnChart data={monthlyData} height={320} />
          ) : (
            <SvgLineChart
              data={monthlyData}
              xKey="m"
              yKey="pass"
              ariaLabel={`Grafik garis bulanan tahun ${selectedYear}`}
            />
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100/70 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-xs bg-sky-500 shadow-xs shadow-sky-500/40" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Bulan Paling Banyak ({peakMonth.m})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-xs bg-blue-600 shadow-xs shadow-blue-600/40" />
                <span>Volume Bulanan Reguler</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Arahkan kursor ke tiap batang untuk melihat selisih dan detail penumpang
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Grid: Kenaikan Penumpang MoM & Perbandingan Kuartal */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Kenaikan Penumpang per Bulan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Kenaikan / Perubahan Penumpang Bulanan (MoM)</CardTitle>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                ± Juta Orang
              </span>
            </div>
            <CardDescription>
              Lonjakan penumpang terbesar terjadi di bulan{" "}
              <strong className="text-blue-700 dark:text-blue-400 font-bold">
                {highestSurge.fullName} (+{formatNumber(highestSurge.diffFromPrev || 0, 2)} juta)
              </strong>{" "}
              seiring mobilitas tinggi musim liburan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SvgBarList
              items={momItems}
              suffix=" jt"
              decimals={2}
              allowNegative={true}
            />
          </CardContent>
        </Card>

        {/* Akumulasi Kuartal */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Perbandingan Total Kuartal {selectedYear}</CardTitle>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                Akumulasi Kuartal
              </span>
            </div>
            <CardDescription>
              Total volume penumpang per kuartal (Q1–Q4) dalam satuan juta orang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SvgBarList
              items={quarterItems}
              suffix=" jt"
              decimals={2}
              highlightHighest={true}
              allowNegative={false}
            />
            <div className="mt-4 rounded-xl border border-blue-200/60 bg-blue-50/50 p-3.5 text-xs text-slate-700 backdrop-blur-xs dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Pola Musiman:</span>
              </div>
              <p className="mt-1 leading-relaxed">
                Kuartal 3 (liburan sekolah pertengahan tahun) dan Kuartal 4 (liburan Natal & Tahun Baru) secara konsisten menjadi periode dengan pergerakan penumpang paling padat di seluruh jaringan KAI.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
