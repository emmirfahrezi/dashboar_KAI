"use client";

import React, { useState } from "react";
import { DashboardScope, CompareYear } from "@/types/dashboard";
import { DashboardHeader } from "./dashboard-header";
import { DataSourceNotice } from "./data-source-notice";
import { KPISection } from "./kpi-section";
import { AnnualCharts } from "./annual-charts";
import { MonthlyCharts } from "./monthly-charts";
import { ModesCharts } from "./modes-charts";
import { DataTableSection } from "./data-table-section";
import { InsightsSection } from "./insights-section";
import { DataSourceSection } from "./data-source-section";
import { DashboardFooter } from "./dashboard-footer";

export function DashboardShell() {
  const [scope, setScope] = useState<DashboardScope>("annual");
  const [compareYear, setCompareYear] = useState<CompareYear>(2026);

  const handleReset = () => {
    setScope("annual");
    setCompareYear(2026);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col space-y-7 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Header with Title and Scope Controls */}
      <DashboardHeader
        scope={scope}
        setScope={setScope}
        compareYear={compareYear}
        setCompareYear={setCompareYear}
        onReset={handleReset}
      />

      {/* Scope Disclaimer / Notice */}
      <DataSourceNotice />

      {/* Key Performance Indicators */}
      <section className="space-y-2.5">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Ringkasan Utama
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Indikator utama berubah otomatis mengikuti fokus data yang dipilih di atas.
          </p>
        </div>
        <KPISection scope={scope} compareYear={compareYear} />
      </section>

      {/* Charts Section Based on Active Scope */}
      <section className="space-y-2.5">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scope === "annual" && "Perjalanan Penumpang dari Tahun ke Tahun (2015–2026)"}
            {scope === "monthly" && "Analisis Penumpang per Bulan & Periode Puncak"}
            {scope === "modes" && "Komposisi Moda Transportasi Rel di Indonesia"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {scope === "annual" &&
              "Jumlah penumpang tahunan dalam satuan juta orang dari tahun 2015 hingga 2026."}
            {scope === "monthly" &&
              "Grafik batang distribusi volume bulanan, penanda bulan dengan penumpang paling banyak, dan kenaikan MoM."}
            {scope === "modes" &&
              "Jumlah penumpang per kategori moda rel dalam satuan juta orang dan kontribusi pangsa pasarnya."}
          </p>
        </div>

        {scope === "annual" && <AnnualCharts />}
        {scope === "monthly" && <MonthlyCharts />}
        {scope === "modes" && <ModesCharts />}
      </section>

      {/* Data Table Section */}
      <DataTableSection scope={scope} />

      {/* Insights Section */}
      <InsightsSection scope={scope} />

      {/* Methodology, Data Sources & Definitions */}
      <DataSourceSection />

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
}
