import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers using Indonesian locale convention (comma as decimal, dot as thousands separator)
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format percentages with plus sign for positive numbers
 */
export function formatPercent(value: number, decimals: number = 1): string {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${formatNumber(value, decimals)}%`;
}

/**
 * Format raw integer count from millions
 */
export function formatPassengerCount(valueInMillions: number): string {
  return Math.round(valueInMillions * 1e6).toLocaleString("id-ID");
}

