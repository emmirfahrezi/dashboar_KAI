export type DashboardScope = "annual" | "monthly" | "modes";

export type CompareYear = 2026 | 2025 | 2024 | 2023 | 2022 | 2019;

export interface AnnualRecord {
  year: number;
  pass: number; // in millions
}

export interface AnnualWithGrowthRecord extends AnnualRecord {
  growth: number | null; // percentage YoY
  diff: number | null; // absolute change in millions
}

export interface MonthlyRecord {
  m: string; // "Jan", "Feb", etc.
  fullName: string;
  pass: number; // in millions
  diffFromPrev?: number | null; // in millions
  growthFromPrev?: number | null; // in %
  isPeak?: boolean;
}

export interface MonthlyWithGrowthRecord extends MonthlyRecord {
  growth: number | null; // percentage MoM
}

export interface ModeRecord {
  name: string;
  pass: number; // in millions
}

export interface ModeWithShareRecord extends ModeRecord {
  share: number; // percentage of total
}

export interface QuarterRecord {
  label: string;
  pass: number;
}

export interface KPICardData {
  label: string;
  value: string;
  subtext?: string;
  delta?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
}

export interface InsightItem {
  title: string;
  description: string;
}
