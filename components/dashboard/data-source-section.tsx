"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Database,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Server,
  Lock,
} from "lucide-react";

interface BpsApiResponse {
  status: string;
  message: string;
  provider: string;
  dataOrigin: string;
  connectionType: string;
  totalTables: number;
  tables: Array<{
    id: number;
    title: string;
    updatedAt: string;
    size: string;
  }>;
  timestamp: string;
}

export function DataSourceSection() {
  const [bpsStatus, setBpsStatus] = useState<BpsApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBpsStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bps-kai");
      if (res.ok) {
        const data = await res.json();
        setBpsStatus(data);
      }
    } catch (err) {
      console.error("Gagal memeriksa status BPS API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch("/api/bps-kai")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!ignore && data) {
          setBpsStatus(data);
        }
      })
      .catch((err) => {
        console.error("Gagal memeriksa status BPS API:", err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-[#145d47]" />
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            Sumber Data, Integrasi Resmi, dan Definisi
          </h2>
        </div>

        {bpsStatus?.status === "connected" && (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2b5949] bg-[#0e261f] px-3 py-1 text-xs font-semibold text-[#5fe0b0] shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5fe0b0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5fe0b0]"></span>
            </span>
            <span>WebAPI BPS Live Terhubung</span>
          </div>
        )}
      </div>

      {/* Live WebAPI BPS Card */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0e261f] text-[#5fe0b0] shadow-xs">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Status Integrasi Server WebAPI BPS
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5ef] px-2.5 py-0.5 text-[10px] font-bold text-[#145d47]">
                  <CheckCircle2 className="h-3 w-3 text-[#145d47]" />
                  Koneksi Aman & Terverifikasi
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600">
                Dashboard terhubung resmi ke portal data{" "}
                <span className="font-semibold text-[#145d47]">
                  webapi.bps.go.id
                </span>{" "}
                dengan data bersumber dari{" "}
                <span className="font-semibold text-slate-800">
                  PT Kereta Api (Persero)
                </span>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={fetchBpsStatus}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#f8faf9] px-3.5 py-1.5 text-xs font-semibold text-[#145d47] shadow-2xs transition-all hover:bg-[#e8f5ef] disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Menghubungi..." : "Cek Ulang Server"}</span>
            </button>
          </div>
        </div>

        {/* Status detail grid with zero sensitive credential exposure */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 border-t border-slate-100 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-[#145d47]" />
            <span className="text-slate-500">Keamanan:</span>
            <span className="font-semibold text-slate-800">
              Kredensial Terproteksi di Server (.env)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#145d47]" />
            <span className="text-slate-500">Protokol:</span>
            <span className="font-semibold text-slate-800">
              Server-to-Server HTTPS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-[#145d47]" />
            <span className="text-slate-500">Tabel Resmi:</span>
            <span className="font-semibold text-[#145d47]">
              ID 1426 (PT Kereta Api Persero)
            </span>
          </div>
        </div>
      </Card>

      {/* Methodology, Scope & References */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4 text-xs text-slate-700">
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#e8f5ef] text-[#145d47]">
              <Database className="h-3.5 w-3.5" />
            </div>
            <span>Sumber Utama & Legalitas Data:</span>
          </div>
          <p className="mt-1 text-slate-600 leading-relaxed pl-8">
            Data ini bersumber resmi dari <strong>Badan Pusat Statistik (BPS)</strong> melalui layanan WebAPI BPS serta tabel statistik jumlah penumpang kereta api yang disuplai langsung oleh <strong>PT Kereta Api Indonesia (Persero)</strong>. Seri historis dirangkum dari publikasi statistik perhubungan dan laporan tahunan publik ter-audit.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#e8f5ef] text-[#145d47]">
              <HelpCircle className="h-3.5 w-3.5" />
            </div>
            <span>Definisi Operasional:</span>
          </div>
          <p className="mt-1 text-slate-600 leading-relaxed pl-8">
            Penumpang didefinisikan sebagai jumlah perjalanan/layanan penumpang yang tercatat (ritase tiket), bukan jumlah individu unik. Satu orang yang melakukan perjalanan berulang dihitung secara terpisah pada setiap perjalanan yang dilakukan.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#e8f5ef] text-[#145d47]">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
            <span>Batasan & Ruang Lingkup Akademik:</span>
          </div>
          <p className="mt-1 text-slate-600 leading-relaxed pl-8">
            Aplikasi ini dikembangkan untuk keperluan akademik/tugas perkuliahan. Sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi (UU PDP), dataset yang digunakan adalah agregat makro publik dan tidak memuat data pribadi sensitif (seperti NIK, nama penumpang, rute per individu, maupun data transaksi perbankan).
          </p>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <span className="font-bold text-slate-900">
            Tautan Referensi Resmi BPS & KAI:
          </span>
          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[#145d47]">
            <a
              href="https://webapi.bps.go.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:text-[#0e261f] hover:underline"
            >
              <span>Portal Pengembang WebAPI BPS</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://www.bps.go.id/id/statistics-table/2/MjA1MSMy/jumlah-penumpang-berdasarkan-moda-transportasi-kereta-api-orang.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:text-[#0e261f] hover:underline"
            >
              <span>BPS — Jumlah Penumpang Moda Kereta Api</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://ppid.kai.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:text-[#0e261f] hover:underline"
            >
              <span>PPID KAI — Laporan Tahunan Terbuka</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Card>
    </section>
  );
}
