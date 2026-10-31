"use client";

import React from "react";
import { DashboardScope } from "@/types/dashboard";
import {
  ANNUAL_DATA,
  MONTHLY_DATA_2026,
  MODES_DATA_2024,
  TOTAL_MODES_PASSENGERS,
} from "@/data/kai-passenger-data";
import { formatNumber } from "@/lib/utils";
import { Sparkles, Info, TrendingUp, ShieldAlert, Award } from "lucide-react";

interface InsightsSectionProps {
  scope: DashboardScope;
}

export function InsightsSection({ scope }: InsightsSectionProps) {
  let insights: { title: string; desc: string; icon: React.ReactNode }[] = [];

  if (scope === "annual") {
    const p2019 = ANNUAL_DATA.find((d) => d.year === 2019)!.pass;
    const p2020 = ANNUAL_DATA.find((d) => d.year === 2020)!.pass;
    const p2026 = ANNUAL_DATA.find((d) => d.year === 2026)!.pass;

    const covidDrop = ((p2020 / p2019) - 1) * 100;
    const totalGrowth = ((p2026 / p2019) - 1) * 100;

    insights = [
      {
        title: "Pencapaian Rekor Baru 2026 (>500 Juta)",
        desc: `Pada 2026, volume penumpang kereta api menembus angka ${formatNumber(p2026, 2)} juta, melampaui masa pra-pandemi 2019 sebesar ${formatNumber(totalGrowth, 1)}%.`,
        icon: <Award className="h-4 w-4 text-[#145d47]" />,
      },
      {
        title: "Penurunan Drastis Periode Pandemi (2020–2021)",
        desc: `Volume anjlok ${formatNumber(Math.abs(covidDrop), 1)}% pada 2020 akibat pembatasan sosial ketat, sebelum mulai bangkit secara konsisten sejak 2022.`,
        icon: <ShieldAlert className="h-4 w-4 text-rose-500" />,
      },
      {
        title: "Ekspansi & Peningkatan Kapasitas Rel",
        desc: "Kenaikan pesat 2024–2026 ditopang oleh elektrifikasi jalur baru, penambahan armada KRL, serta operasional jalur rel terintegrasi antarmoda.",
        icon: <TrendingUp className="h-4 w-4 text-[#145d47]" />,
      },
    ];
  } else if (scope === "monthly") {
    const peak = MONTHLY_DATA_2026.reduce((a, b) => (a.pass > b.pass ? a : b));
    const low = MONTHLY_DATA_2026.reduce((a, b) => (a.pass < b.pass ? a : b));

    insights = [
      {
        title: `Kapan Penumpang Paling Banyak? Puncak Tahun Berjalan di ${peak.fullName}`,
        desc: `Pada tahun berjalan 2026 (Jan–Okt), volume penumpang tertinggi tercatat di bulan ${peak.fullName} (${formatNumber(peak.pass, 2)} juta) didorong momentum libur sekolah. (Catatan: November & Desember belum rilis).`,
        icon: <Award className="h-4 w-4 text-[#145d47]" />,
      },
      {
        title: "Lonjakan Musiman: Mudik Lebaran di Bulan April",
        desc: `Bulan April (${formatNumber(MONTHLY_DATA_2026[3].pass, 2)} juta) mencatatkan lonjakan kenaikan tajam seiring arus mudik Lebaran di seluruh lintas operasional.`,
        icon: <TrendingUp className="h-4 w-4 text-[#145d47]" />,
      },
      {
        title: `Titik Terendah di ${low.fullName}`,
        desc: `Bulan ${low.fullName} mencatatkan volume terendah (${formatNumber(low.pass, 2)} juta) terutama dipengaruhi jumlah hari kalender yang paling sedikit (28-29 hari).`,
        icon: <Info className="h-4 w-4 text-[#145d47]" />,
      },
    ];
  } else {
    // scope === "modes"
    const jabodetabek = MODES_DATA_2024[0];
    const whoosh = MODES_DATA_2024.find((m) => m.name.includes("Whoosh"));

    insights = [
      {
        title: "Jabodetabek Sebagai Tulang Punggung",
        desc: `KRL Jabodetabek menyumbang ${formatNumber((jabodetabek.pass / TOTAL_MODES_PASSENGERS) * 100, 1)}% dari total seluruh moda rel di Indonesia dengan ${formatNumber(jabodetabek.pass, 2)} juta perjalanan.`,
        icon: <TrendingUp className="h-4 w-4 text-[#145d47]" />,
      },
      {
        title: "Ekspansi Kereta Cepat & Perkotaan",
        desc: `MRT, LRT, dan KCIC Whoosh (${formatNumber(whoosh?.pass || 6.056, 2)} juta) mempercepat transisi gaya hidup komuter modern antar-kota dan urban.`,
        icon: <Sparkles className="h-4 w-4 text-[#145d47]" />,
      },
      {
        title: "Integrasi Antarmoda Modern",
        desc: "Konektivitas stasiun sentral (Manggarai, Halim, Sudirman) mempermudah perpindahan penumpang antarkereta konvensional, MRT, LRT, dan Kereta Cepat.",
        icon: <Info className="h-4 w-4 text-[#145d47]" />,
      },
    ];
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#145d47]" />
        <h2 className="text-base font-bold tracking-tight text-slate-900">
          Insight yang Dapat Dibaca dari Dashboard
        </h2>
      </div>
      <p className="text-xs text-slate-500">
        Interpretasi otomatis berdasarkan dataset yang sedang aktif ditampilkan.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl border border-slate-200/80 border-l-4 border-l-[#145d47] bg-white p-4.5 shadow-xs transition-all duration-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#e8f5ef] text-[#145d47]">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
