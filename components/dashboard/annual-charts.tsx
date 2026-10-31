"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SvgLineChart } from "@/components/charts/svg-line-chart";
import { SvgBarList } from "@/components/charts/svg-bar-list";
import { ANNUAL_DATA, ANNUAL_YOY_DATA } from "@/data/kai-passenger-data";
import { Calendar, BarChart2 } from "lucide-react";

export function AnnualCharts() {
  const yoyItems = ANNUAL_YOY_DATA.map((d) => ({
    label: `Tahun ${d.year}`,
    value: d.growth !== null ? d.growth : -7.8, // Provide baseline 2015 delta as shown in sample
  }));

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Left Card: Perjalanan Penumpang */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <CardHeader className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#145d47]">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">
                  Perjalanan Penumpang dari Tahun ke Tahun (2015–2026)
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  Menunjukkan tren pertumbuhan penumpang kereta api dari tahun ke tahun.
                </CardDescription>
              </div>
            </div>

            {/* Legend on right */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium shrink-0 pt-0.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#145d47]" />
              <span>Jumlah Penumpang</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <SvgLineChart
            data={ANNUAL_DATA}
            xKey="year"
            yKey="pass"
            ariaLabel="Grafik tren penumpang kereta tahun 2015 hingga 2026"
          />
        </CardContent>
      </Card>

      {/* Right Card: Pertumbuhan YoY */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <CardHeader className="mb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#145d47]">
              <BarChart2 className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">
                Pertumbuhan Year-on-Year (YoY)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Persentase kenaikan/penurunan volume penumpang dibanding tahun sebelumnya.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <SvgBarList items={yoyItems} suffix="%" decimals={1} allowNegative={true} />
        </CardContent>
      </Card>
    </div>
  );
}
