"use client";

import React from "react";
import { DashboardScope, CompareYear } from "@/types/dashboard";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  RotateCcw,
  Train,
  CheckCircle2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  currentView: DashboardScope | "all";
  setCurrentView: (view: DashboardScope | "all") => void;
  scope: DashboardScope;
  setScope: (scope: DashboardScope) => void;
  compareYear: CompareYear;
  setCompareYear: (year: CompareYear) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({
  currentView,
  setCurrentView,
  setScope,
  compareYear,
  setCompareYear,
  onReset,
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const menuItems: Array<{
    id: DashboardScope | "all";
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: "all",
      label: "Overview Lengkap",
      sublabel: "Ringkasan seluruh dataset",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: "annual",
      label: "Tren Historis",
      sublabel: "2015 – 2026 (12 Tahun)",
      icon: <TrendingUp className="h-4 w-4" />,
      badge: "2026",
    },
    {
      id: "monthly",
      label: "Pola & Puncak Bulanan",
      sublabel: "Kenaikan MoM & waktu puncak",
      icon: <BarChart3 className="h-4 w-4" />,
      badge: "Peak",
    },
    {
      id: "modes",
      label: "Komposisi Moda",
      sublabel: "KRL, MRT, LRT, Whoosh",
      icon: <PieChart className="h-4 w-4" />,
    },
  ];

  const handleSelectView = (id: DashboardScope | "all") => {
    setCurrentView(id);
    if (id !== "all") {
      setScope(id);
    }
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-white/70 bg-white/75 p-5 shadow-xl shadow-blue-950/5 backdrop-blur-2xl transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-slate-900/85 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6">
          {/* Brand Logo & Close button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-md shadow-blue-600/30 ring-1 ring-white/50">
                <Train className="h-6 w-6" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20 pointer-events-none" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    KAI Analytics
                  </span>
                  <span className="rounded-full bg-blue-100/80 px-1.5 py-0.2 text-[8px] font-extrabold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    PRO
                  </span>
                </div>
                <h2 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                  Data Penumpang
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/60 bg-white/60 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Section */}
          <div className="space-y-1.5">
            <div className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Navigasi Analitik
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectView(item.id)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-md shadow-blue-600/25"
                        : "text-slate-600 hover:bg-white/80 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-blue-400"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "transition-transform duration-200 group-hover:scale-110",
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400"
                        )}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <div className="leading-tight">{item.label}</div>
                        <div
                          className={cn(
                            "text-[10px] font-normal leading-tight",
                            isActive
                              ? "text-blue-100"
                              : "text-slate-400 dark:text-slate-500"
                          )}
                        >
                          {item.sublabel}
                        </div>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-blue-100/70 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Filter Widget inside Sidebar */}
          <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-blue-50/60 to-white/70 p-3.5 shadow-xs backdrop-blur-md dark:border-white/10 dark:from-slate-800/60 dark:to-slate-900/60">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-200">
              <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Tahun Pembanding</span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
              Pilih acuan komparasi data tahunan:
            </p>

            <select
              value={compareYear}
              onChange={(e) =>
                setCompareYear(Number(e.target.value) as CompareYear)
              }
              className="mt-2.5 w-full rounded-xl border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs outline-none transition-all hover:border-blue-300 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value={2026}>2026 (Tahun Terkini)</option>
              <option value={2025}>2025 (Rekor Pasca Pandemi)</option>
              <option value={2024}>2024 (Realisasi BPS)</option>
              <option value={2023}>2023 (Normalisasi)</option>
              <option value={2022}>2022 (Awal Pemulihan)</option>
              <option value={2019}>2019 (Puncak Pra-Pandemi)</option>
            </select>

            <button
              type="button"
              onClick={onReset}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-200/70 bg-white/70 py-1.5 text-xs font-bold text-blue-700 shadow-2xs transition-all hover:bg-blue-50 active:scale-98 dark:border-blue-900/50 dark:bg-slate-800/70 dark:text-blue-300"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Pengaturan</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Academic Profile & WebAPI Live Badge */}
        <div className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between rounded-xl border border-emerald-200/70 bg-emerald-50/60 p-2.5 backdrop-blur-xs dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300">
                WebAPI BPS Live
              </div>
            </div>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="flex items-center gap-2.5 px-1">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-xs">
              EF
            </div>
            <div className="truncate">
              <div className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                Emmir Fahrezi
              </div>
              <div className="truncate text-[10px] text-slate-400 dark:text-slate-500">
                Tugas Analitik KAI
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
