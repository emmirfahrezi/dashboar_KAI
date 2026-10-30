import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#ebf3fe] via-[#f1f5fc] to-[#e4eefb] text-slate-900 selection:bg-blue-200 selection:text-blue-900 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/60 dark:text-slate-100">
      {/* Decorative ambient glassmorphism glowing orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blue-400/25 to-sky-300/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-indigo-400/20 via-blue-500/15 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-400/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <DashboardShell />
      </div>
    </main>
  );
}
