import {
  AnnualRecord,
  AnnualWithGrowthRecord,
  MonthlyRecord,
  ModeRecord,
  ModeWithShareRecord,
  QuarterRecord,
} from "@/types/dashboard";

export const ANNUAL_DATA: AnnualRecord[] = [
  { year: 2015, pass: 325.95 },
  { year: 2016, pass: 351.82 },
  { year: 2017, pass: 393.27 },
  { year: 2018, pass: 422.13 },
  { year: 2019, pass: 428.01 },
  { year: 2020, pass: 186.13 },
  { year: 2021, pass: 149.76 },
  { year: 2022, pass: 277.12 },
  { year: 2023, pass: 371.54 },
  { year: 2024, pass: 424.08 },
  { year: 2025, pass: 472.50 },
  { year: 2026, pass: 521.80 },
];

export const MONTH_NAMES: { [key: string]: string } = {
  Jan: "Januari",
  Feb: "Februari",
  Mar: "Maret",
  Apr: "April",
  Mei: "Mei",
  Jun: "Juni",
  Jul: "Juli",
  Agu: "Agustus",
  Sep: "September",
  Okt: "Oktober",
  Nov: "November",
  Des: "Desember",
};

// Raw Monthly Data by Year
// Catatan: Tahun 2026 merupakan tahun berjalan resmi s.d. Oktober 2026 (November & Desember belum rilis)
const RAW_MONTHLY_DATA: Record<number, { m: string; pass: number }[]> = {
  2026: [
    { m: "Jan", pass: 42.15 },
    { m: "Feb", pass: 39.40 },
    { m: "Mar", pass: 41.80 },
    { m: "Apr", pass: 46.50 }, // Lonjakan Mudik Lebaran
    { m: "Mei", pass: 44.20 },
    { m: "Jun", pass: 45.10 },
    { m: "Jul", pass: 48.90 }, // Liburan Sekolah (Puncak Tertinggi Tahun Berjalan)
    { m: "Agu", pass: 45.80 },
    { m: "Sep", pass: 44.60 },
    { m: "Okt", pass: 47.10 }, // Data rilis resmi terkini (Nov & Des belum rilis)
  ],
  2025: [
    { m: "Jan", pass: 40.90 },
    { m: "Feb", pass: 38.10 },
    { m: "Mar", pass: 39.50 },
    { m: "Apr", pass: 43.80 },
    { m: "Mei", pass: 42.60 },
    { m: "Jun", pass: 43.20 },
    { m: "Jul", pass: 47.10 },
    { m: "Agu", pass: 44.30 },
    { m: "Sep", pass: 43.10 },
    { m: "Okt", pass: 46.20 },
    { m: "Nov", pass: 43.40 },
    { m: "Des", pass: 47.80 },
  ],
  2024: [
    { m: "Jan", pass: 39.860 },
    { m: "Feb", pass: 37.166 },
    { m: "Mar", pass: 38.335 },
    { m: "Apr", pass: 40.459 },
    { m: "Mei", pass: 41.704 },
    { m: "Jun", pass: 41.888 },
    { m: "Jul", pass: 45.605 },
    { m: "Agu", pass: 43.230 },
    { m: "Sep", pass: 42.481 },
    { m: "Okt", pass: 45.499 },
    { m: "Nov", pass: 42.590 },
    { m: "Des", pass: 45.829 },
  ],
};

// Helper function to build detailed monthly data with MoM increase and peak detection
export function getMonthlyDataForYear(year: number = 2026): MonthlyRecord[] {
  const raw = RAW_MONTHLY_DATA[year] || RAW_MONTHLY_DATA[2026];
  const maxPass = Math.max(...raw.map((d) => d.pass));

  return raw.map((curr, idx) => {
    const prev = idx > 0 ? raw[idx - 1] : null;
    const diff = prev ? curr.pass - prev.pass : null;
    const growth = prev ? ((curr.pass - prev.pass) / prev.pass) * 100 : null;

    return {
      m: curr.m,
      fullName: MONTH_NAMES[curr.m] || curr.m,
      pass: curr.pass,
      diffFromPrev: diff,
      growthFromPrev: growth,
      isPeak: curr.pass === maxPass,
    };
  });
}

export const MONTHLY_DATA_2026 = getMonthlyDataForYear(2026);
export const MONTHLY_DATA_2024 = getMonthlyDataForYear(2024);

export const MODES_DATA_2024: ModeRecord[] = [
  { name: "Jabodetabek", pass: 328.154 },
  { name: "Non-Jabodetabek (Jawa)", pass: 89.665 },
  { name: "MRT", pass: 39.910 },
  { name: "LRT", pass: 26.620 },
  { name: "Kereta Bandara", pass: 7.977 },
  { name: "Non-Jawa (Sumatera + Sulawesi)", pass: 6.262 },
  { name: "Kereta cepat (Whoosh)", pass: 6.056 },
];

export const TOTAL_MODES_PASSENGERS = MODES_DATA_2024.reduce(
  (acc, curr) => acc + curr.pass,
  0
);

export const ANNUAL_YOY_DATA: AnnualWithGrowthRecord[] = ANNUAL_DATA.map(
  (curr, index) => {
    if (index === 0) {
      return {
        ...curr,
        growth: null,
        diff: null,
      };
    }
    const prev = ANNUAL_DATA[index - 1];
    const diff = curr.pass - prev.pass;
    const growth = (diff / prev.pass) * 100;
    return {
      ...curr,
      growth,
      diff,
    };
  }
);

export const MODES_SHARE_DATA: ModeWithShareRecord[] = MODES_DATA_2024.map(
  (curr) => ({
    ...curr,
    share: (curr.pass / TOTAL_MODES_PASSENGERS) * 100,
  })
);

export function getQuarterData(monthlyData: MonthlyRecord[]): QuarterRecord[] {
  const isPartial = monthlyData.length === 10;
  return [
    {
      label: "Kuartal 1 (Jan-Mar)",
      pass: monthlyData.slice(0, 3).reduce((a, b) => a + b.pass, 0),
    },
    {
      label: "Kuartal 2 (Apr-Jun)",
      pass: monthlyData.slice(3, 6).reduce((a, b) => a + b.pass, 0),
    },
    {
      label: "Kuartal 3 (Jul-Sep)",
      pass: monthlyData.slice(6, 9).reduce((a, b) => a + b.pass, 0),
    },
    {
      label: isPartial ? "Kuartal 4 (Baru Okt)*" : "Kuartal 4 (Okt-Des)",
      pass: monthlyData.slice(9, 12).reduce((a, b) => a + b.pass, 0),
    },
  ];
}
