import React from "react";
import { Info } from "lucide-react";

export function DataSourceNotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 text-xs text-blue-950 shadow-sm backdrop-blur-md dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
        <Info className="h-4 w-4" />
      </div>
      <div className="leading-relaxed">
        <strong className="font-bold text-blue-900 dark:text-blue-300">
          Catatan cakupan data:{" "}
        </strong>
        <span>
          Angka tren tahunan 2015–2026 diambil dari seri BPS yang tidak mencakup
          kereta bandara, MRT, LRT, dan Whoosh. Rincian moda tahun 2024 menggunakan cakupan
          yang lebih luas. Angka pada dua cakupan tersebut tidak boleh dijumlahkan
          atau dibandingkan secara langsung tanpa penjelasan metodologi.
        </span>
      </div>
    </div>
  );
}
