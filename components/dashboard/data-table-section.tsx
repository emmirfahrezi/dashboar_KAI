"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardScope } from "@/types/dashboard";
import {
  ANNUAL_YOY_DATA,
  getMonthlyDataForYear,
  MODES_DATA_2024,
  TOTAL_MODES_PASSENGERS,
} from "@/data/kai-passenger-data";
import { formatNumber, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown, Table as TableIcon, Award } from "lucide-react";

interface DataTableSectionProps {
  scope: DashboardScope;
}

export function DataTableSection({ scope }: DataTableSectionProps) {
  const [selectedTableYear, setSelectedTableYear] = useState<number>(2026);
  const monthlyData = getMonthlyDataForYear(selectedTableYear);

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TableIcon className="h-4 w-4 text-[#145d47]" />
            <h2 className="text-base font-bold tracking-tight text-slate-900">
              Rincian Data
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            {scope === "annual" &&
              "Jumlah penumpang tahunan dan dinamika pertumbuhan year-on-year (2015–2026)."}
            {scope === "monthly" &&
              `Rincian volume bulanan, selisih kenaikan penumpang (juta), dan persentase pertumbuhan MoM tahun ${selectedTableYear}.`}
            {scope === "modes" &&
              "Komposisi volume dan kontribusi pangsa moda transportasi kereta api di Indonesia."}
          </p>
        </div>

        {scope === "monthly" && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
            <span className="text-slate-500 text-[11px]">Tahun data:</span>
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              {[2026, 2025, 2024].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedTableYear(year)}
                  className={`rounded-lg px-2.5 py-0.5 text-xs font-bold transition-all ${
                    selectedTableYear === year
                      ? "bg-[#145d47] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Card className="overflow-hidden p-0 border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          {scope === "annual" && (
            <table className="w-full min-w-[550px] border-collapse text-left text-xs">
              <thead className="border-b border-slate-200 bg-[#f8faf9] text-[11px] font-bold uppercase tracking-wider text-slate-700">
                <tr>
                  <th className="px-5 py-3.5">Tahun</th>
                  <th className="px-5 py-3.5 text-right">Penumpang (Juta)</th>
                  <th className="px-5 py-3.5 text-right">Perubahan (Juta)</th>
                  <th className="px-5 py-3.5 text-right">Pertumbuhan YoY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ANNUAL_YOY_DATA.map((row) => {
                  const isNegative = row.growth !== null && row.growth < 0;
                  const isCurrentYear = row.year === 2026;
                  return (
                    <tr
                      key={row.year}
                      className={`transition-colors hover:bg-[#f0f4f2]/60 ${
                        isCurrentYear ? "bg-[#e8f5ef]/40 font-semibold" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5 text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <span>{row.year}</span>
                          {isCurrentYear && (
                            <span className="rounded-full bg-[#e8f5ef] border border-[#cbe8db] px-2 py-0.5 text-[9px] font-extrabold text-[#145d47]">
                              Terkini
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-medium text-slate-900">
                        {formatNumber(row.pass, 2)}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono text-slate-600">
                        {row.diff !== null
                          ? (row.diff > 0 ? "+" : "") + formatNumber(row.diff, 2)
                          : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {row.growth !== null ? (
                          <Badge
                            variant={isNegative ? "danger" : "default"}
                            className={`font-mono text-[11px] ${!isNegative ? "bg-[#e8f5ef] text-[#145d47] border-[#cbe8db]" : ""}`}
                          >
                            {isNegative ? (
                              <TrendingDown className="h-3 w-3" />
                            ) : (
                              <TrendingUp className="h-3 w-3 text-[#145d47]" />
                            )}
                            {formatPercent(row.growth)}
                          </Badge>
                        ) : (
                          <span className="font-mono text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {scope === "monthly" && (
            <table className="w-full min-w-[620px] border-collapse text-left text-xs">
              <thead className="border-b border-slate-200 bg-[#f8faf9] text-[11px] font-bold uppercase tracking-wider text-slate-700">
                <tr>
                  <th className="px-5 py-3.5">Bulan</th>
                  <th className="px-5 py-3.5 text-right">Penumpang (Juta)</th>
                  <th className="px-5 py-3.5 text-right">Kenaikan / Selisih (Juta)</th>
                  <th className="px-5 py-3.5 text-right">Pertumbuhan MoM</th>
                  <th className="px-5 py-3.5 text-center">Status Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {monthlyData.map((row) => {
                  const isNegative =
                    row.growthFromPrev !== null &&
                    row.growthFromPrev !== undefined &&
                    row.growthFromPrev < 0;

                  return (
                    <tr
                      key={row.m}
                      className={`transition-colors hover:bg-[#f0f4f2]/60 ${
                        row.isPeak ? "bg-[#e8f5ef]/50" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5 font-semibold text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <span>{row.fullName}</span>
                          <span className="text-[10px] text-slate-400">({row.m})</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-medium text-slate-900">
                        {formatNumber(row.pass, 2)}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono text-slate-600">
                        {row.diffFromPrev !== null && row.diffFromPrev !== undefined ? (
                          <span
                            className={
                              row.diffFromPrev > 0
                                ? "text-[#145d47] font-bold"
                                : row.diffFromPrev < 0
                                ? "text-rose-600 font-bold"
                                : ""
                            }
                          >
                            {row.diffFromPrev > 0 ? "+" : ""}
                            {formatNumber(row.diffFromPrev, 2)} jt
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {row.growthFromPrev !== null &&
                        row.growthFromPrev !== undefined ? (
                          <Badge
                            variant={isNegative ? "danger" : "default"}
                            className={`font-mono text-[11px] ${!isNegative ? "bg-[#e8f5ef] text-[#145d47] border-[#cbe8db]" : ""}`}
                          >
                            {isNegative ? (
                              <TrendingDown className="h-3 w-3" />
                            ) : (
                              <TrendingUp className="h-3 w-3 text-[#145d47]" />
                            )}
                            {formatPercent(row.growthFromPrev)}
                          </Badge>
                        ) : (
                          <span className="font-mono text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {row.isPeak ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#cbe8db] bg-[#e6f4ee] px-2.5 py-0.5 text-[10px] font-extrabold text-[#173e30] shadow-2xs">
                            <Award className="h-3 w-3 text-[#145d47]" />
                            {selectedTableYear === 2026 ? "Puncak Tahun Berjalan" : "Paling Banyak (Puncak)"}
                          </span>
                        ) : row.m === "Feb" ? (
                          <span className="text-[10px] text-slate-400">
                            Titik Terendah
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Normal</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {selectedTableYear === 2026 && (
                <tfoot>
                  <tr>
                    <td
                      colSpan={5}
                      className="border-t border-slate-100 bg-[#f8faf9] px-5 py-2.5 text-[11px] text-slate-500"
                    >
                      *Catatan: Tahun 2026 merupakan tahun berjalan resmi s.d. Oktober 2026. Data bulan November & Desember belum rilis.
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          )}

          {scope === "modes" && (
            <table className="w-full min-w-[550px] border-collapse text-left text-xs">
              <thead className="border-b border-slate-200 bg-[#f8faf9] text-[11px] font-bold uppercase tracking-wider text-slate-700">
                <tr>
                  <th className="px-5 py-3.5">Moda / Kategori Transportasi</th>
                  <th className="px-5 py-3.5 text-right">Penumpang (Juta)</th>
                  <th className="px-5 py-3.5 text-right">Persentase Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MODES_DATA_2024.map((row) => (
                  <tr
                    key={row.name}
                    className="transition-colors hover:bg-[#f0f4f2]/60"
                  >
                    <td className="px-5 py-3.5 font-semibold text-slate-800">
                      {row.name}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-medium text-slate-900">
                      {formatNumber(row.pass, 3)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-bold text-[#145d47]">
                      {formatNumber((row.pass / TOTAL_MODES_PASSENGERS) * 100, 2)}
                      %
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="border-t-2 border-[#145d47]/30 bg-[#f8faf9] font-bold">
                  <td className="px-5 py-4 text-slate-900">
                    Total Kategori pada Tabel BPS
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-slate-900">
                    {formatNumber(TOTAL_MODES_PASSENGERS, 3)}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-[#145d47]">
                    100,00%
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </section>
  );
}
