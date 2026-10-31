import React from "react";
import { Info } from "lucide-react";

export function DataSourceNotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#cbe8db] bg-[#e6f4ee] p-4 text-xs text-[#173e30] shadow-xs">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#145d47] text-white">
        <Info className="h-4 w-4" />
      </div>
      <div className="leading-relaxed">
        <strong className="font-bold text-[#145d47]">
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
