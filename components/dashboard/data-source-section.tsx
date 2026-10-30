import React from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, Database, ShieldCheck, HelpCircle } from "lucide-react";

export function DataSourceSection() {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Sumber Data dan Definisi
        </h2>
      </div>

      <Card className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/60 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Database className="h-3 w-3" />
            </div>
            <span>Sumber Utama:</span>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Badan Pusat Statistik (BPS), tabel statistik jumlah penumpang kereta
            api; rangkuman publik DataIndonesia.id untuk seri tahunan 2015–2024 serta data proyeksi & konsolidasi 2025–2026.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/60 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <HelpCircle className="h-3 w-3" />
            </div>
            <span>Definisi:</span>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Penumpang adalah jumlah perjalanan/layanan penumpang yang tercatat
            (ritase), bukan jumlah individu unik. Satu orang yang bepergian
            berkali-kali dapat dihitung lebih dari sekali.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/60 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <ShieldCheck className="h-3 w-3" />
            </div>
            <span>Batasan & Ruang Lingkup:</span>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Data publik ini menjelaskan volume agregat penggunaan transportasi rel,
            bukan data pribadi pengguna, rute spesifik tiap individu, finansial tiket,
            tingkat kepuasan, atau data kepegawaian.
          </p>
        </div>

        <div className="border-t border-slate-100/80 pt-3 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            Tautan Referensi Resmi:
          </span>
          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-blue-600 dark:text-blue-400">
            <a
              href="https://www.bps.go.id/id/statistics-table/2/MjA1MSMy/jumlah-penumpang-berdasarkan-moda-transportasi-kereta-api-orang.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
            >
              <span>BPS — Jumlah Penumpang Berdasarkan Moda</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="https://www.bps.go.id/id/statistics-table/2/MjM1MyMy/penumpang-angkutan-kereta-api-nasional-bulanan.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
            >
              <span>BPS — Penumpang Kereta Api Nasional Bulanan</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="https://assets.dataindonesia.id/2025/05/09/1746785018453-1-Laporan-Kumpulan-Data-Angkutan-Kereta-Api-Indonesia-10-Tahun-Terakhir-hingga-2024.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
            >
              <span>Rangkuman Seri 2015–2024 DataIndonesia</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Card>
    </section>
  );
}
