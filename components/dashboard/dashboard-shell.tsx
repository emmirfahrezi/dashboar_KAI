"use client";

import React, { useState } from "react";
import { DashboardScope, CompareYear } from "@/types/dashboard";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";
import { DataSourceNotice } from "./data-source-notice";
import { KPISection } from "./kpi-section";
import { AnnualCharts } from "./annual-charts";
import { MonthlyCharts } from "./monthly-charts";
import { ModesCharts } from "./modes-charts";
import { DataTableSection } from "./data-table-section";
import { InsightsSection } from "./insights-section";
import { DataSourceSection } from "./data-source-section";
import { DashboardFooter } from "./dashboard-footer";
import { Sparkles, ArrowUpRight } from "lucide-react";

export function DashboardShell() {
  const [currentView, setCurrentView] = useState<DashboardScope | "all">("all");
  const [scope, setScope] = useState<DashboardScope>("annual");
  const [compareYear, setCompareYear] = useState<CompareYear>(2026);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleReset = () => {
    setCurrentView("all");
    setScope("annual");
    setCompareYear(2026);
  };

  const activeScope: DashboardScope =
    currentView === "all" ? scope : currentView;

  return (
    <div className="flex min-h-screen">
      {/* Sleek Modern Left Sidebar */}
      <DashboardSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        scope={scope}
        setScope={setScope}
        compareYear={compareYear}
        setCompareYear={setCompareYear}
        onReset={handleReset}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardTopbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          setScope={setScope}
          onOpenSidebar={() => setSidebarOpen(true)}
          onReset={handleReset}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 space-y-7 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Custom Hero Banner - Our Own Style */}
          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-700/20 backdrop-blur-2xl">
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-sky-400/20 blur-xl" />

            <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-sky-200" />
                  <span>KAI Mobility Analytics & Insights</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
                  Evolusi & Dinamika Penumpang Kereta Api Indonesia
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Menelusuri 12 tahun rekam jejak mobilitas (2015–2026), pemulihan pasca-pandemi, waktu puncak musiman, dan integrasi antarmoda transportasi rel nasional.
                </p>
              </div>

              {/* Fast highlight metric box */}
              <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                    Rekor Penumpang 2026
                  </div>
                  <div className="text-2xl font-black tracking-tight">521,80 Jt</div>
                  <div className="text-[10px] text-sky-200 font-semibold flex items-center gap-1 mt-0.5">
                    <ArrowUpRight className="h-3 w-3 inline" />
                    +10,43% YoY (Puncak Baru)
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                    Puncak Bulanan
                  </div>
                  <div className="text-2xl font-black tracking-tight">Desember</div>
                  <div className="text-[10px] text-sky-200 font-semibold mt-0.5">
                    49,65 Jt (Musim Liburan)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scope Disclaimer / Notice */}
          <DataSourceNotice />

          {/* Key Performance Indicators */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Ringkasan Indikator Utama (KPI)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Metrik statistik adaptif berdasarkan fokus analisis yang aktif.
                </p>
              </div>

              {currentView === "all" && (
                <div className="flex items-center gap-1.5 rounded-xl border border-white/70 bg-white/70 px-2.5 py-1 text-xs shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-slate-800">
                  <span className="text-slate-500 text-[11px] font-medium">Fokus:</span>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value as DashboardScope)}
                    className="bg-transparent font-bold text-blue-700 outline-none dark:text-blue-400 text-xs cursor-pointer"
                  >
                    <option value="annual">Tahunan (2015–2026)</option>
                    <option value="monthly">Bulanan (2026)</option>
                    <option value="modes">Moda (2024)</option>
                  </select>
                </div>
              )}
            </div>
            <KPISection scope={activeScope} compareYear={compareYear} />
          </section>

          {/* Charts Section: Conditional or All Views */}
          {(currentView === "all" || currentView === "annual") && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Perjalanan Penumpang dari Tahun ke Tahun (2015–2026)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menampilkan dinamika tren volume penumpang tahunan (dalam juta orang) dan persentase pertumbuhan YoY.
                  </p>
                </div>
              </div>
              <AnnualCharts />
            </section>
          )}

          {(currentView === "all" || currentView === "monthly") && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Analisis Penumpang per Bulan & Periode Puncak
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Grafik batang persebaran volume bulanan dan deteksi waktu dengan penumpang paling padat.
                  </p>
                </div>
              </div>
              <MonthlyCharts />
            </section>
          )}

          {(currentView === "all" || currentView === "modes") && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Komposisi Moda Transportasi Rel di Indonesia
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Proporsi perjalanan antarkategori: KRL Jabodetabek, Kereta Antarkota Jawa, MRT, LRT, dan Whoosh.
                  </p>
                </div>
              </div>
              <ModesCharts />
            </section>
          )}

          {/* Interactive Data Table Section */}
          <DataTableSection scope={activeScope} />

          {/* Automatic Narrative Insights Section */}
          <InsightsSection scope={activeScope} />

          {/* Official BPS WebAPI Integration & Methodology */}
          <DataSourceSection />

          {/* Footer */}
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}
