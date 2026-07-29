import StatCard from "./statCard";
import type { CycleStatsProps } from "../../types";

function formatDays(value: number | null, suffix = "d"): string {
  if (value === null) return "--";
  return `${value}${suffix}`;
}

function formatDaysUntil(value: number | null): string {
  if (value === null) return "--";
  if (value === 0) return "Today";
  if (value < 0) return `${Math.abs(value)}d late`;
  return `${value}d`;
}

export default function CycleStats({
  avgCycleLength,
  avgPeriodLength,
  daysUntilNext,
}: CycleStatsProps) {
  return (
    <div className="flex gap-3">
      <StatCard label="Avg cycle" value={formatDays(avgCycleLength)} />
      <StatCard label="Avg period" value={formatDays(avgPeriodLength)} />
      <StatCard label="Next period" value={formatDaysUntil(daysUntilNext)} />
    </div>
  );
}
