"use client";

import React from "react";
import { KPICard } from "./kpi-card";
import { DashboardScope, CompareYear } from "@/types/dashboard";
import {
  ANNUAL_DATA,
  MONTHLY_DATA_2026,
  MODES_DATA_2024,
  TOTAL_MODES_PASSENGERS,
} from "@/data/kai-passenger-data";
import { formatNumber, formatPercent } from "@/lib/utils";
import { Users, TrendingUp, Train, Calendar } from "lucide-react";

interface KPISectionProps {
  scope: DashboardScope;
  compareYear: CompareYear;
  timeHorizon?: "5" | "10" | "12";
}

export function KPISection({
  scope,
  compareYear,
  timeHorizon = "12",
}: KPISectionProps) {
  if (scope === "annual") {
    const last = ANNUAL_DATA[ANNUAL_DATA.length - 1]; // 2026
    const prev = ANNUAL_DATA[ANNUAL_DATA.length - 2]; // 2025
    const growth = ((last.pass - prev.pass) / prev.pass) * 100;

    // Filter slice based on time horizon
    const horizonYears =
      timeHorizon === "5"
        ? ANNUAL_DATA.slice(-5)
        : timeHorizon === "10"
        ? ANNUAL_DATA.slice(-10)
        : ANNUAL_DATA;

    const baseYearData = horizonYears[0];
    const totalGrowth =
      ((last.pass - baseYearData.pass) / baseYearData.pass) * 100;

    const peak = horizonYears.reduce((a, b) => (a.pass > b.pass ? a : b));
    const lowest = horizonYears.reduce((a, b) => (a.pass < b.pass ? a : b));

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Jumlah Penumpang */}
        <KPICard
          label={`Jumlah Penumpang ${compareYear}`}
          value={`${formatNumber(last.pass, 2)} juta`}
          delta={`↑ ${formatPercent(growth)} vs 2025`}
          deltaPositive={growth >= 0}
          icon={<Users className="h-4 w-4" />}
          sparklineVariant="growth"
        />

        {/* Card 2: Pertumbuhan */}
        <KPICard
          label={`Pertumbuhan ${baseYearData.year}–2026`}
          value={`+${formatNumber(totalGrowth, 1)}%`}
          foot="Kinerja terus meningkat setiap tahunnya."
          icon={<TrendingUp className="h-4 w-4" />}
          sparklineVariant="growth"
        />

        {/* Card 3: Tertinggi */}
        <KPICard
          label="Tertinggi dalam Sejarah"
          value={`${formatNumber(peak.pass, 2)} juta`}
          foot={`Rekor baru tahun ${peak.year}.`}
          icon={<Train className="h-4 w-4" />}
          sparklineVariant="peak"
        />

        {/* Card 4: Terendah */}
        <KPICard
          label="Terendah dalam Sejarah"
          value={`${formatNumber(lowest.pass, 2)} juta`}
          foot={`Rata-rata pada Covid-19 (${lowest.year}).`}
          icon={<Calendar className="h-4 w-4" />}
          sparklineVariant="low"
        />
      </div>
    );
  }

  if (scope === "monthly") {
    const sum = MONTHLY_DATA_2026.reduce((a, b) => a + b.pass, 0);
    const avg = sum / MONTHLY_DATA_2026.length;
    const peak = MONTHLY_DATA_2026.reduce((a, b) => (a.pass > b.pass ? a : b));
    const low = MONTHLY_DATA_2026.reduce((a, b) => (a.pass < b.pass ? a : b));

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Realisasi 2026 (s.d. Okt)"
          value={`${formatNumber(sum, 2)} juta`}
          foot="Akumulasi 10 bulan tahun berjalan"
          icon={<Users className="h-4 w-4" />}
          sparklineVariant="growth"
        />
        <KPICard
          label="Rata-rata per Bulan"
          value={`${formatNumber(avg, 2)} juta`}
          foot="Rata-rata mobilitas Jan–Okt"
          icon={<Calendar className="h-4 w-4" />}
          sparklineVariant="growth"
        />
        <KPICard
          label="Puncak Tahun Berjalan"
          value={`${peak.m} (${formatNumber(peak.pass, 2)} jt)`}
          foot="Puncak liburan sekolah (Juli)"
          delta="★ Rekor s.d. Okt"
          deltaPositive={true}
          icon={<Train className="h-4 w-4" />}
          sparklineVariant="peak"
        />
        <KPICard
          label="Bulan Terendah"
          value={`${low.m} (${formatNumber(low.pass, 2)} jt)`}
          foot="Hari kalender tersedikit (Februari)"
          icon={<Calendar className="h-4 w-4" />}
          sparklineVariant="low"
        />
      </div>
    );
  }

  // scope === "modes"
  const largestMode = MODES_DATA_2024[0];
  const smallestMode = MODES_DATA_2024[MODES_DATA_2024.length - 1];
  const jabodetabekShare = (largestMode.pass / TOTAL_MODES_PASSENGERS) * 100;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        label="Total Moda Transportasi"
        value={`${formatNumber(TOTAL_MODES_PASSENGERS, 3)} juta`}
        foot="Cakupan luas nasional"
        icon={<Train className="h-4 w-4" />}
        sparklineVariant="growth"
      />
      <KPICard
        label="Moda Terbesar"
        value={largestMode.name}
        foot={`${formatNumber(largestMode.pass, 2)} juta penumpang`}
        icon={<Users className="h-4 w-4" />}
        sparklineVariant="peak"
      />
      <KPICard
        label="Pangsa Jabodetabek"
        value={`${formatNumber(jabodetabekShare, 1)}%`}
        foot="Dominasi komuter perkotaan"
        icon={<TrendingUp className="h-4 w-4" />}
        sparklineVariant="growth"
      />
      <KPICard
        label="Moda Baru Berkembang"
        value={smallestMode.name}
        foot={`${formatNumber(smallestMode.pass, 2)} juta penumpang`}
        icon={<Calendar className="h-4 w-4" />}
        sparklineVariant="dip"
      />
    </div>
  );
}
