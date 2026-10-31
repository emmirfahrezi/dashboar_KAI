"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SvgBarList } from "@/components/charts/svg-bar-list";
import { MODES_DATA_2024, MODES_SHARE_DATA } from "@/data/kai-passenger-data";

export function ModesCharts() {
  const modeVolumeItems = MODES_DATA_2024.map((m) => ({
    label: m.name,
    value: m.pass,
  }));

  const modeShareItems = MODES_SHARE_DATA.map((m) => ({
    label: m.name,
    value: m.share,
  }));

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Penumpang Berdasarkan Moda Transportasi</CardTitle>
            <span className="text-[11px] font-bold text-[#145d47]">
              Satuan: Juta Orang
            </span>
          </div>
          <CardDescription>
            Volume penumpang per moda transportasi rel di Indonesia pada tahun 2024.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SvgBarList
            items={modeVolumeItems}
            suffix=" jt"
            decimals={2}
            highlightHighest={true}
            allowNegative={false}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Kontribusi Pangsa Pasar Moda (%)</CardTitle>
            <span className="text-[11px] font-bold text-[#145d47]">
              Pangsa Rel
            </span>
          </div>
          <CardDescription>
            Persentase kontribusi masing-masing kategori moda terhadap total volume rel 2024.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SvgBarList
            items={modeShareItems}
            suffix="%"
            decimals={1}
            highlightHighest={true}
            allowNegative={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
