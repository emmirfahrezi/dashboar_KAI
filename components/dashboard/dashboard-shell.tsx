"use client";

import React, { useState } from "react";
import { CompareYear } from "@/types/dashboard";
import { DashboardSidebar, SidebarTab } from "./dashboard-sidebar";
import { KPISection } from "./kpi-section";
import { AnnualCharts } from "./annual-charts";
import { MonthlyCharts } from "./monthly-charts";
import { ModesCharts } from "./modes-charts";
import { DataTableSection } from "./data-table-section";
import { InsightsSection } from "./insights-section";
import { DataSourceSection } from "./data-source-section";
import { DashboardFooter } from "./dashboard-footer";
import {
  Sparkles,
  Train,
  Calendar,
  Bell,
  Info,
  ArrowRight,
  Menu,
} from "lucide-react";

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");
  const [compareYear, setCompareYear] = useState<CompareYear>(2026);
  const [timeHorizon, setTimeHorizon] = useState<"5" | "10" | "12">("12");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f0f4f2] text-[#142820]">
      {/* Left Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareYear={compareYear}
        setCompareYear={setCompareYear}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by 64 on Desktop to accommodate fixed sidebar) */}
      <div className="flex flex-1 flex-col min-w-0 lg:pl-64 overflow-x-hidden">
        {/* Floating Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu navigasi"
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0e261f] text-white shadow-xl shadow-black/20 ring-2 ring-white/60 transition-all active:scale-95 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Scrollable Dashboard Container */}
        <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-7 max-w-[1360px] w-full mx-auto">
          {/* Top User Bar (Bell Notification & Avatar) */}
          <div className="flex items-center justify-between lg:justify-end gap-3">
            {/* Mobile Brand indicator */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0e261f] text-white font-black text-xs">
                KAI
              </div>
              <span className="font-extrabold text-xs text-slate-800">
                KAI Analytics
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Notification Bell Button */}
              <button
                type="button"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200/80 shadow-2xs text-slate-600 hover:bg-slate-50 transition-all"
                aria-label="Pemberitahuan"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </button>

              {/* User Avatar EF */}
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0e261f] text-white font-bold text-xs shadow-2xs select-none"
                title="Emmir Fahrezi"
              >
                EF
              </div>
            </div>
          </div>

          {/* Panoramic Hero Banner with Monas Silhouette Overlay */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c221b] via-[#112d24] to-[#183d31] p-6 sm:p-7 text-white shadow-sm border border-[#1e4638]">
            {/* Monas Skyline Background Silhouette */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-2/3 lg:w-1/2 opacity-20 mix-blend-screen"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 240'%3E%3Cpath fill='%23ffffff' d='M520,240 L520,80 L524,80 L524,40 L523,30 L525,20 L527,30 L526,40 L526,80 L530,80 L530,240 Z M505,240 L545,240 L540,210 L510,210 Z'/%3E%3Cpath fill='%23ffffff' d='M0,240 L120,240 L120,170 L140,170 L140,240 L200,240 L200,140 L230,140 L230,240 L310,240 L310,120 L350,120 L350,240 L450,240 L450,150 L480,150 L480,240 L650,240 L650,160 L680,160 L680,240 Z' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                backgroundSize: "contain",
              }}
            />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Content */}
              <div className="max-w-2xl space-y-2.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2b5949] bg-[#16382c]/80 px-3 py-1 text-xs font-semibold text-[#b4dfcf] backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#5fe0b0]" />
                  <span>KAI Mobility Analytics & Insights</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-[28px] font-black tracking-tight leading-snug">
                  Evolusi & Dinamika Penumpang Kereta Api Indonesia
                </h1>

                <p className="text-xs sm:text-[13px] text-[#b8d8cc] leading-relaxed max-w-xl">
                  Menelusuri 12 tahun rekam jejak mobilitas (2015–2026) pemulihan pasca-pandemi, waktu puncak mobilitas, dan integrasi antarmoda transportasi di Indonesia.
                </p>
              </div>

              {/* Right Content: Two Glass Metric Cards */}
              <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
                {/* Card 1: Rekor Penumpang */}
                <div className="min-w-[145px] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md shadow-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                    <Train className="h-3.5 w-3.5 text-slate-300" />
                    <span>Rekor Penumpang 2026</span>
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-white">
                    521,80 Jt
                  </div>
                  <div className="mt-0.5 text-[10px] font-bold text-[#5fe0b0]">
                    Realisasi s.d. Okt: 445,55 Jt
                  </div>
                </div>

                {/* Card 2: Puncak Bulanan */}
                <div className="min-w-[145px] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md shadow-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-slate-300" />
                    <span>Puncak 2026 (s.d. Okt)</span>
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-white">
                    Juli
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-[#5fe0b0]">
                    48,90 Jt (Libur Sekolah)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notice Alert Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 rounded-xl border border-[#cbe8db] bg-[#e6f4ee] px-4 py-3 text-xs text-[#173e30]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#173e30] text-white">
                <Info className="h-3 w-3" />
              </div>
              <span className="leading-relaxed">
                <strong>Catatan:</strong> Rata-rata di tahun 2015–2026 menunjukkan tren kenaikan, dengan lonjakan signifikan pada tahun 2023–2024.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("explore")}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#173e30] hover:underline self-end sm:self-auto shrink-0"
            >
              <span>Lihat Detail</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Tab 1: Dashboard (Main view matching image) */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Section Header with 5 Thn / 10 Thn / 12 Thn Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900">
                    Ringkasan Indikator Utama (KPI)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Metrik utama kinerja penumpang kereta api Indonesia dari 2015 hingga 2026.
                  </p>
                </div>

                {/* Segmented Control Pills (5 Tahun | 10 Tahun | 12 Tahun) */}
                <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-2xs self-start sm:self-auto">
                  {(["5", "10", "12"] as const).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setTimeHorizon(h)}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        timeHorizon === h
                          ? "bg-[#133c30] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {h} Tahun
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 KPI Cards Grid */}
              <KPISection
                scope="annual"
                compareYear={compareYear}
                timeHorizon={timeHorizon}
              />

              {/* Charts Row (Left: Perjalanan Penumpang, Right: Pertumbuhan YoY) */}
              <AnnualCharts />

              {/* BPS WebAPI Status Card & Reference */}
              <DataSourceSection />
            </div>
          )}

          {/* Tab 2: Laporan & Analitik (Monthly & Peak Analytics) */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="pt-1">
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Laporan Pola Bulanan & Waktu Puncak Mobilitas
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Analisis pergerakan penumpang per bulan, penanda waktu liburan puncak, dan kenaikan MoM.
                </p>
              </div>

              <KPISection scope="monthly" compareYear={compareYear} />
              <MonthlyCharts />
              <DataTableSection scope="monthly" />
            </div>
          )}

          {/* Tab 3: Eksplorasi Data (Modes & Complete Data Table) */}
          {activeTab === "explore" && (
            <div className="space-y-6">
              <div className="pt-1">
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Eksplorasi Data & Komposisi Antarmoda
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distribusi perjalanan antarkategori moda rel (KRL Jabodetabek, Kereta Antarkota, MRT, LRT, Whoosh).
                </p>
              </div>

              <KPISection scope="modes" compareYear={compareYear} />
              <ModesCharts />
              <DataTableSection scope="annual" />
              <InsightsSection scope="annual" />
            </div>
          )}

          {/* Tab 4: Pengaturan & Sumber Data */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="pt-1">
                <h2 className="text-base font-bold tracking-tight text-slate-900">
                  Pengaturan, Verifikasi Data & Keamanan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Status koneksi live WebAPI Badan Pusat Statistik (BPS) dan informasi keamanan kredensial.
                </p>
              </div>

              <DataSourceSection />
            </div>
          )}

          {/* Footer */}
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
}
