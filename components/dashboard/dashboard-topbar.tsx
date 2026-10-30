"use client";

import React from "react";
import { DashboardScope } from "@/types/dashboard";
import {
  Menu,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardTopbarProps {
  currentView: DashboardScope | "all";
  setCurrentView: (view: DashboardScope | "all") => void;
  setScope: (scope: DashboardScope) => void;
  onOpenSidebar: () => void;
  onReset: () => void;
}

export function DashboardTopbar({
  currentView,
  setCurrentView,
  setScope,
  onOpenSidebar,
  onReset,
}: DashboardTopbarProps) {
  const getViewTitle = () => {
    switch (currentView) {
      case "annual":
        return "Tren Historis Penumpang Kereta Api (2015–2026)";
      case "monthly":
        return "Analisis Dinamika Bulanan & Waktu Puncak (2024–2026)";
      case "modes":
        return "Komposisi & Distribusi Moda Transportasi Rel";
      case "all":
      default:
        return "Ringkasan Eksekutif & Dasbor Terpadu KAI";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/60 bg-white/60 px-4 py-3.5 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:px-6 lg:px-8">
      {/* Left: Mobile Menu Button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Buka menu navigasi"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-slate-700 shadow-2xs backdrop-blur-md hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
            <span>KAI Analytics</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">
              {currentView === "all" ? "Overview" : currentView}
            </span>
          </div>
          <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-50 truncate max-w-[240px] sm:max-w-none">
            {getViewTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Quick Tab Pills & Action Badges */}
      <div className="flex items-center gap-2.5">
        {/* Fast scope pills on desktop */}
        <div className="hidden md:inline-flex rounded-xl border border-white/80 bg-slate-100/70 p-1 backdrop-blur-xs dark:border-white/10 dark:bg-slate-800/70 text-xs">
          <button
            type="button"
            onClick={() => {
              setCurrentView("all");
            }}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              currentView === "all"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentView("annual");
              setScope("annual");
            }}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              currentView === "annual"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Tahunan
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentView("monthly");
              setScope("monthly");
            }}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              currentView === "monthly"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Bulanan
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentView("modes");
              setScope("modes");
            }}
            className={`rounded-lg px-3 py-1 font-bold transition-all ${
              currentView === "modes"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Moda
          </button>
        </div>

        {/* Live BPS Badge */}
        <Badge
          variant="outline"
          className="hidden sm:inline-flex gap-1.5 py-1 px-2.5 text-[11px] font-bold border-emerald-300/80 bg-emerald-50/70 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>BPS API Live</span>
        </Badge>

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          title="Reset filter & tampilan"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-slate-600 shadow-2xs backdrop-blur-md transition-all hover:bg-slate-50 hover:text-blue-600 active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
