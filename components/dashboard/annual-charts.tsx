"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SvgLineChart } from "@/components/charts/svg-line-chart";
import { SvgBarList } from "@/components/charts/svg-bar-list";
import { ANNUAL_DATA, ANNUAL_YOY_DATA } from "@/data/kai-passenger-data";

export function AnnualCharts() {
  const yoyItems = ANNUAL_YOY_DATA.filter((d) => d.growth !== null).map((d) => ({
    label: `Tahun ${d.year}`,
    value: d.growth as number,
  }));

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tren Jumlah Penumpang (2015–2026)</CardTitle>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
              Satuan: Juta Orang
            </span>
          </div>
          <CardDescription>
            Menampilkan volume perjalanan tahunan 2015 hingga 2026: penurunan tajam pandemi, pemulihan, dan pencapaian rekor baru di atas 500 juta penumpang.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SvgLineChart
            data={ANNUAL_DATA}
            xKey="year"
            yKey="pass"
            ariaLabel="Grafik tren penumpang kereta tahun 2015 hingga 2026"
          />
          <div className="mt-3 flex items-center justify-center gap-6 border-t border-slate-100/70 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-600 shadow-xs shadow-blue-500/40" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Volume Tahunan (Juta)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-3 bg-slate-300 dark:bg-slate-700" />
              <span>Garis Referensi</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pertumbuhan Year-on-Year (%)</CardTitle>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
              % Pertumbuhan
            </span>
          </div>
          <CardDescription>
            Persentase kenaikan/penurunan volume penumpang dibanding tahun sebelumnya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SvgBarList items={yoyItems} suffix="%" decimals={1} allowNegative={true} />
        </CardContent>
      </Card>
    </div>
  );
}
