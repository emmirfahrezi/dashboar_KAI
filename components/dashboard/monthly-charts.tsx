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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Calendar className="h-4 w-4 text-[#145d47]" />
          <span>Tahun Analisis Bulanan:</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
            {[2026, 2025, 2024].map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  selectedYear === year
                    ? "bg-[#145d47] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Model Visualisasi:</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setChartType("column")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                chartType === "column"
                  ? "bg-[#145d47] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
                  ? "bg-[#145d47] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
                Menjawab kapan penumpang paling banyak: {selectedYear === 2026 ? "Puncak tertinggi tahun berjalan (Jan–Okt) tercatat di bulan " : `Puncak tertinggi tahun ${selectedYear} tercatat di bulan `}
                <strong className="text-[#145d47] font-bold">
                  {peakMonth.fullName} ({formatNumber(peakMonth.pass, 2)} juta)
                </strong>
                {selectedYear === 2026 ? " pada masa liburan sekolah (November & Desember belum rilis)." : "."}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#cbe8db] bg-[#e6f4ee] px-3.5 py-1 text-xs font-bold text-[#173e30] shadow-2xs">
              <Award className="h-3.5 w-3.5 text-[#145d47]" />
              <span>Puncak {selectedYear === 2026 ? "s.d. Okt" : selectedYear}: {peakMonth.fullName}</span>
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

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-xs bg-[#5fe0b0]" />
                <span className="font-semibold text-slate-800">
                  Bulan Paling Banyak ({peakMonth.m})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-xs bg-[#145d47]" />
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
              <span className="text-[11px] font-bold text-[#145d47]">
                ± Juta Orang
              </span>
            </div>
            <CardDescription>
              Lonjakan penumpang terbesar terjadi di bulan{" "}
              <strong className="text-[#145d47] font-bold">
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
              <span className="text-[11px] font-bold text-[#145d47]">
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
            <div className="mt-4 rounded-xl border border-[#cbe8db] bg-[#e6f4ee] p-3.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-[#145d47]">
                <TrendingUp className="h-3.5 w-3.5 text-[#145d47]" />
                <span>Pola Musiman:</span>
              </div>
              <p className="mt-1 leading-relaxed">
                {selectedYear === 2026
                  ? "Kuartal 3 (liburan sekolah pertengahan tahun) menjadi periode terpadat tahun berjalan 2026. Kuartal 4 baru mencakup data resmi bulan Oktober (November & Desember belum rilis)."
                  : "Kuartal 3 (liburan sekolah pertengahan tahun) dan Kuartal 4 (liburan Natal & Tahun Baru) secara konsisten menjadi periode dengan pergerakan penumpang paling padat di seluruh jaringan KAI."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
