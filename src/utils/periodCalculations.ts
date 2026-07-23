import type { Period } from "../types";

export function getAvgCycleLength(periods: Period[]): number | null {
  // need at least 2 periods to calculate a cycle
  if (periods.length < 2) return null;

  const lengths: number[] = [];

  for (let i = 1; i < periods.length; i++) {
    const prev = new Date(periods[i - 1].startDate);
    const curr = new Date(periods[i].startDate);
    // difference in milliseconds divided by milliseconds in a day
    const days = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    lengths.push(days);
  }

  const average = lengths.reduce((sum, v) => sum + v, 0) / lengths.length;
  return Math.round(average);
}

export function getAvgPeriodLength(periods: Period[]): number | null {
  // only count periods that have an end date
  const completed = periods.filter((p) => p.endDate !== null);

  if (completed.length === 0) return null;

  const lengths = completed.map((p) => {
    const start = new Date(p.startDate);
    const end = new Date(p.endDate!);
    // +1 because both start and end days count
    return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  });

  const average = lengths.reduce((sum, v) => sum + v, 0) / lengths.length;
  return Math.round(average);
}

export function predictNextPeriod(periods: Period[]): Date | null {
  if (periods.length === 0) return null;

  const lastPeriod = periods[periods.length - 1];
  const lastStart = new Date(lastPeriod.startDate);

  const avgCycle = getAvgCycleLength(periods);

  // if only one period exists, use 28 days as default
  const cycleDays = avgCycle ?? 28;

  lastStart.setDate(lastStart.getDate() + cycleDays);
  return lastStart;
}

export function daysUntilNextPeriod(periods: Period[]): number | null {
  const next = predictNextPeriod(periods);
  if (!next) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time, keep only the date

  return Math.round((next.getTime() - today.getTime()) / 86400000);
}
