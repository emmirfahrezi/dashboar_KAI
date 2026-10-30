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
import {
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  Calendar,
  TrainTrack,
  PieChart,
} from "lucide-react";

interface KPISectionProps {
  scope: DashboardScope;
  compareYear: CompareYear;
}

export function KPISection({ scope, compareYear }: KPISectionProps) {
  if (scope === "annual") {
    const last = ANNUAL_DATA[ANNUAL_DATA.length - 1]; // 2026
    const prev = ANNUAL_DATA[ANNUAL_DATA.length - 2]; // 2025
    const growth = ((last.pass - prev.pass) / prev.pass) * 100;
    const peak = ANNUAL_DATA.reduce((a, b) => (a.pass > b.pass ? a : b));
    const lowest = ANNUAL_DATA.reduce((a, b) => (a.pass < b.pass ? a : b));
    const totalGrowth =
      ((last.pass - ANNUAL_DATA[0].pass) / ANNUAL_DATA[0].pass) * 100;

    const compRecord = ANNUAL_DATA.find((x) => x.year === compareYear);
    const card1Foot =
      compareYear && compRecord
        ? `Tahun pembanding ${compareYear}: ${formatNumber(compRecord.pass, 2)} juta penumpang`
        : "Seri historis & konsolidasi data rel";

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Jumlah penumpang 2026"
          value={`${formatNumber(last.pass, 2)} juta`}
          foot={card1Foot}
          delta={`${formatPercent(growth)} vs 2025`}
          deltaType="blue"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          label="Perubahan 2015–2026"
          value={formatPercent(totalGrowth)}
          foot="Kenaikan total selama 12 tahun"
          deltaType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          label="Tertinggi dalam seri"
          value={`${formatNumber(peak.pass, 2)} juta`}
          foot={`Rekor baru tahun ${peak.year}`}
          icon={<Award className="h-4 w-4 text-blue-600" />}
        />
        <KPICard
          label="Terendah dalam seri"
          value={`${formatNumber(lowest.pass, 2)} juta`}
          foot={`Dampak pandemi Covid-19 (${lowest.year})`}
          deltaType="negative"
          icon={<AlertTriangle className="h-4 w-4 text-rose-500" />}
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
          label="Total penumpang tahun 2026"
          value={`${formatNumber(sum, 2)} juta`}
          foot="Akumulasi bulanan jaringan rel"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          label="Rata-rata per bulan"
          value={`${formatNumber(avg, 2)} juta`}
          foot="Rata-rata mobilitas bulanan"
          icon={<Calendar className="h-4 w-4" />}
        />
        <KPICard
          label="Bulan paling banyak"
          value={`${peak.m} (${formatNumber(peak.pass, 2)} jt)`}
          foot="Puncak liburan Nataru (Desember)"
          delta="Penumpang Tertinggi"
          deltaType="blue"
          icon={<Award className="h-4 w-4 text-blue-600" />}
        />
        <KPICard
          label="Bulan terendah"
          value={`${low.m} (${formatNumber(low.pass, 2)} jt)`}
          foot="Hari kalender tersedikit (Februari)"
          icon={<TrendingUp className="h-4 w-4" />}
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
        label="Total moda transportasi"
        value={`${formatNumber(TOTAL_MODES_PASSENGERS, 3)} juta`}
        foot="Cakupan luas nasional"
        icon={<TrainTrack className="h-4 w-4" />}
      />
      <KPICard
        label="Moda volume terbesar"
        value={largestMode.name}
        foot={`${formatNumber(largestMode.pass, 2)} juta penumpang`}
        icon={<Award className="h-4 w-4 text-blue-600" />}
      />
      <KPICard
        label="Pangsa Jabodetabek"
        value={`${formatNumber(jabodetabekShare, 1)}%`}
        foot="Dominasi komuter perkotaan"
        icon={<PieChart className="h-4 w-4" />}
      />
      <KPICard
        label="Moda baru / berkembang"
        value={smallestMode.name}
        foot={`${formatNumber(smallestMode.pass, 2)} juta penumpang`}
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
}
