"use client";

import React from "react";
import { CompareYear } from "@/types/dashboard";
import {
  Home,
  BarChart2,
  Search,
  Settings,
  Calendar,
  Info,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarTab = "dashboard" | "reports" | "explore" | "settings";

interface DashboardSidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  compareYear: CompareYear;
  setCompareYear: (year: CompareYear) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({
  activeTab,
  setActiveTab,
  compareYear,
  setCompareYear,
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const navItems: Array<{
    id: SidebarTab;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: "reports",
      label: "Laporan & Analitik",
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      id: "explore",
      label: "Eksplorasi Data",
      icon: <Search className="h-4 w-4" />,
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container - Fixed on Desktop ("fix aja diem"), Overlay Drawer on Mobile */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex w-64 flex-col justify-between bg-[#0e261f] p-5 text-white transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col space-y-7">
          {/* Brand Logo Area */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 3-Bar Chart Brand Icon */}
              <div className="flex h-9 w-9 items-end justify-center gap-1 rounded-xl bg-[#173a30] p-1.5 border border-[#275344]">
                <span className="h-3 w-1.5 rounded-xs bg-[#5fe0b0]" />
                <span className="h-4.5 w-1.5 rounded-xs bg-[#2dc290]" />
                <span className="h-6 w-1.5 rounded-xs bg-[#10755a]" />
              </div>

              <div>
                <div className="font-extrabold tracking-tight text-white text-base leading-tight">
                  KAI Analytics
                </div>
                <div className="text-[10px] text-[#7da394] font-medium tracking-wide">
                  Data. Insight. Impact.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#173a30] text-[#7da394] hover:text-white lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 text-left",
                    isActive
                      ? "bg-[#183a30] text-white border border-[#285747] shadow-sm"
                      : "text-[#91b5a5] hover:bg-[#14332a] hover:text-white"
                  )}
                >
                  <span className={isActive ? "text-[#5fe0b0]" : "text-[#7da394]"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Tahun Analisis Filter Box */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#91b5a5]">
              <Calendar className="h-3.5 w-3.5 text-[#5fe0b0]" />
              <span>Tahun Analisis</span>
            </div>

            <div className="relative">
              <select
                value={compareYear}
                onChange={(e) =>
                  setCompareYear(Number(e.target.value) as CompareYear)
                }
                className="w-full appearance-none rounded-xl border border-[#275344] bg-[#15362c] px-3.5 py-2.5 text-xs font-bold text-white shadow-inner outline-none transition-all hover:border-[#38705d] focus:border-[#5fe0b0] cursor-pointer"
              >
                <option value={2026} className="bg-[#0e261f] text-white">2026</option>
                <option value={2025} className="bg-[#0e261f] text-white">2025</option>
                <option value={2024} className="bg-[#0e261f] text-white">2024</option>
                <option value={2023} className="bg-[#0e261f] text-white">2023</option>
                <option value={2022} className="bg-[#0e261f] text-white">2022</option>
                <option value={2019} className="bg-[#0e261f] text-white">2019</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7da394]">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-[#173a30] pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#91b5a5]">
            <Info className="h-3.5 w-3.5 text-[#5fe0b0]" />
            <span>Tentang KAI Analytics</span>
          </div>
          <div className="mt-1 text-[10px] text-[#618777]">
            Sumber data: BPS & KAI Indonesia
          </div>
        </div>
      </aside>
    </>
  );
}
