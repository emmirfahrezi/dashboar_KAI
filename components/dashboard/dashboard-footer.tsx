import React from "react";

export function DashboardFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500 sm:text-left">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p>
          Dashboard Pembelajaran Interaktif Penumpang Kereta Api Indonesia. Data
          historis dan moda memiliki cakupan yang berbeda sesuai metodologi BPS.
        </p>
        <p className="shrink-0 text-[11px] text-slate-400">
          Satuan angka dibulatkan untuk memudahkan visualisasi data.
        </p>
      </div>
    </footer>
  );
}
