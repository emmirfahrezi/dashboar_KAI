"use client";

import React from "react";
import { DashboardScope, CompareYear } from "@/types/dashboard";
import { RotateCcw, Filter, Calendar } from "lucide-react";

interface DashboardHeaderProps {
  scope: DashboardScope;
  setScope: (scope: DashboardScope) => void;
  compareYear: CompareYear;
  setCompareYear: (year: CompareYear) => void;
  onReset: () => void;
}

export function DashboardHeader({
  scope,
  setScope,
  compareYear,
  setCompareYear,
  onReset,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-white/60 pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
      {/* Brand & Title */}
      <div className="flex items-start gap-4 sm:items-center">
        <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 font-black tracking-wider text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/40">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20 pointer-events-none" />
          KAI
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Information Dashboard
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200/80 bg-blue-50/80 px-2 py-0.5 text-[9px] font-bold text-blue-700 backdrop-blur-xs dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              BPS WebAPI Connected
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-slate-50">
            Penumpang Kereta Api Indonesia
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Tren historis 2015–2026, analisis waktu puncak bulanan, dan komposisi moda transportasi rel
          </p>
        </div>
      </div>

      {/* Interactive Controls with Glassmorphism */}
      <div className="flex flex-wrap items-end gap-3">
        {/* Scope selector */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="scope-select"
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            <Filter className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            <span>Fokus Data</span>
          </label>
          <select
            id="scope-select"
            value={scope}
            onChange={(e) => setScope(e.target.value as DashboardScope)}
            className="h-10 rounded-xl border border-white/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md outline-none transition-all hover:border-blue-300 hover:bg-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-200 dark:focus:border-blue-400"
          >
            <option value="annual">Tren tahunan (2015–2026)</option>
            <option value="monthly">Tren bulanan & kenaikan puncak</option>
            <option value="modes">Komposisi moda transportasi</option>
          </select>
        </div>

        {/* Compare Year Selector (visible for annual scope) */}
        {scope === "annual" && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="compare-select"
              className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            >
              <Calendar className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span>Tahun Pembanding</span>
            </label>
            <select
              id="compare-select"
              value={compareYear}
              onChange={(e) =>
                setCompareYear(Number(e.target.value) as CompareYear)
              }
              className="h-10 rounded-xl border border-white/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md outline-none transition-all hover:border-blue-300 hover:bg-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-200 dark:focus:border-blue-400"
            >
              <option value={2026}>2026 (Tahun Terkini)</option>
              <option value={2025}>2025 (Rekor Baru Pasca Pandemi)</option>
              <option value={2024}>2024 (Realisasi BPS)</option>
              <option value={2023}>2023 (Normalisasi)</option>
              <option value={2022}>2022 (Awal Pemulihan)</option>
              <option value={2019}>2019 (Puncak Pra-Pandemi)</option>
            </select>
          </div>
        )}

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-600/35 active:scale-98"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Tampilan</span>
        </button>
      </div>
    </header>
  );
}
