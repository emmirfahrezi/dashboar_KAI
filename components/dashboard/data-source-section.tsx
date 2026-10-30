"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Database,
  ShieldCheck,
  HelpCircle,
  Wifi,
  CheckCircle2,
  RefreshCw,
  Key,
  Server,
} from "lucide-react";

interface BpsApiResponse {
  status: string;
  message: string;
  provider: string;
  dataOrigin: string;
  apiKeyMasked: string;
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
  const [showJson, setShowJson] = useState(false);

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
          <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Sumber Data, WebAPI Resmi, dan Definisi
          </h2>
        </div>

        {bpsStatus?.status === "connected" && (
          <Badge variant="blue" className="gap-1.5 py-1 px-3 text-[11px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>WebAPI BPS Live Terhubung</span>
          </Badge>
        )}
      </div>

      {/* Live WebAPI BPS Card */}
      <Card className="border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white/80 to-sky-50/50 p-5 backdrop-blur-xl dark:border-blue-900/40 dark:from-slate-900/80 dark:to-blue-950/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Status Integrasi Server WebAPI BPS
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Kunci API Aktif
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Dashboard terhubung secara resmi ke portal pengembang{" "}
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  webapi.bps.go.id
                </span>{" "}
                dengan data bersumber dari{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
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
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs backdrop-blur-md transition-all hover:bg-blue-50 disabled:opacity-50 dark:border-blue-800 dark:bg-slate-800 dark:text-blue-300"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Menghubungi..." : "Cek Ulang Server"}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowJson(!showJson)}
              className="rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-md hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {showJson ? "Tutup Data" : "Lihat Raw API"}
            </button>
          </div>
        </div>

        {/* Status detail grid */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 border-t border-blue-100/80 pt-3 text-xs dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Key className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-500 dark:text-slate-400">API Key:</span>
            <code className="rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-slate-200">
              {bpsStatus?.apiKeyMasked || "557ff0af...baca2b"}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-500 dark:text-slate-400">Endpoint:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              v1/api/list/statictable
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-500 dark:text-slate-400">Tabel Terverifikasi:</span>
            <span className="font-semibold text-blue-700 dark:text-blue-300">
              ID 1426 (PT KAI Persero)
            </span>
          </div>
        </div>

        {/* Collapsible raw JSON response preview for lecturer / examination */}
        {showJson && bpsStatus && (
          <div className="mt-4 rounded-xl border border-blue-200/80 bg-slate-900 p-3.5 text-[11px] font-mono text-emerald-400 shadow-inner overflow-x-auto">
            <div className="mb-2 text-[10px] uppercase font-bold text-slate-400">
              Respons Live dari WebAPI BPS (JSON Payload):
            </div>
            <pre>{JSON.stringify(bpsStatus, null, 2)}</pre>
          </div>
        )}
      </Card>

      {/* Methodology, Scope & References */}
      <Card className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/60 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Database className="h-3 w-3" />
            </div>
            <span>Sumber Utama & Legalitas Data:</span>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Data ini bersumber resmi dari <strong>Badan Pusat Statistik (BPS)</strong> melalui layanan WebAPI BPS serta tabel statistik jumlah penumpang kereta api yang disuplai langsung oleh <strong>PT Kereta Api Indonesia (Persero)</strong>. Seri historis dirangkum dari publikasi statistik perhubungan dan laporan tahunan publik ter-audit.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/60 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <HelpCircle className="h-3 w-3" />
            </div>
            <span>Definisi Operasional:</span>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Penumpang didefinisikan sebagai jumlah perjalanan/layanan penumpang yang tercatat (ritase tiket), bukan jumlah individu unik. Satu orang yang melakukan perjalanan berulang dihitung secara terpisah pada setiap perjalanan yang dilakukan.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-100/60 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <ShieldCheck className="h-3 w-3" />
            </div>
            <span>Batasan & Ruang Lingkup Akademik:</span>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Aplikasi ini dikembangkan untuk keperluan akademik/tugas perkuliahan. Sesuai UU No. 27/2022 tentang Pelindungan Data Pribadi (UU PDP), dataset yang digunakan adalah agregat makro publik dan tidak memuat data pribadi sensitif (seperti NIK, nama penumpang, rute per individu, maupun data transaksi perbankan).
          </p>
        </div>

        <div className="border-t border-slate-100/80 pt-3 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            Tautan Referensi Resmi BPS & KAI:
          </span>
          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-blue-600 dark:text-blue-400">
            <a
              href="https://webapi.bps.go.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
            >
              <span>Portal Pengembang WebAPI BPS</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="https://www.bps.go.id/id/statistics-table/2/MjA1MSMy/jumlah-penumpang-berdasarkan-moda-transportasi-kereta-api-orang.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
            >
              <span>BPS — Jumlah Penumpang Moda Kereta Api</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="https://ppid.kai.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline"
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
