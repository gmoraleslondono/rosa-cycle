import { useState } from "react";
import { format, getDaysInMonth, startOfMonth, getDay, isToday } from "date-fns";
import type { Period, PeriodCalendarProps } from "../../types";

type DayType = "period" | "predicted" | "fertile" | "today" | "normal";

function getDayType(
  date: Date,
  periods: Period[],
  predictedStart: Date | null,
  avgPeriodLength: number | null
): DayType {
  const dateStr = format(date, "yyyy-MM-dd");

  // check if it is a logged period day
  const isPeriod = periods.some((p) => {
    if (!p.endDate) return dateStr === p.startDate;
    return dateStr >= p.startDate && dateStr <= p.endDate;
  });
  if (isPeriod) return "period";

  // check if it is a predicted period day
  if (predictedStart) {
    const predStart = format(predictedStart, "yyyy-MM-dd");
    const predEnd = new Date(predictedStart);
    predEnd.setDate(predEnd.getDate() + (avgPeriodLength ?? 5) - 1);
    const predEndStr = format(predEnd, "yyyy-MM-dd");

    if (dateStr >= predStart && dateStr <= predEndStr) return "predicted";
  }

  // check if it is today
  if (isToday(date)) return "today";

  return "normal";
}

const DAY_STYLES: Record<DayType, string> = {
  period: "bg-pink-100 text-pink-800 font-medium",
  predicted: "bg-pink-50 text-pink-400",
  fertile: "bg-emerald-50 text-emerald-700",
  today: "bg-pink-400 text-white font-medium rounded-full",
  normal: "text-gray-500",
};

function CalendarGrid({
  year,
  month,
  periods,
  predictedStart,
  avgPeriodLength,
}: {
  year: number;
  month: number;
  periods: Period[];
  predictedStart: Date | null;
  avgPeriodLength: number | null;
}) {
  const firstDay = startOfMonth(new Date(year, month));
  const totalDays = getDaysInMonth(firstDay);

  // getDay returns 0=Sunday, 1=Monday etc
  // we want 0=Monday so we shift it
  const startOffset = (getDay(firstDay) + 6) % 7;

  const days = [];

  // add empty cells before the first day
  for (let i = 0; i < startOffset; i++) {
    days.push(<div key={`empty-${i}`} />);
  }

  // add one cell per day
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    const type = getDayType(date, periods, predictedStart, avgPeriodLength);

    days.push(
      <div
        key={day}
        className={`
            aspect-square flex items-center justify-center text-xs
            ${DAY_STYLES[type]}
            ${type !== "today" ? "rounded-lg" : ""}
          `}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
        <div key={d} className="text-center text-xs text-gray-300 font-medium py-1">
          {d}
        </div>
      ))}
      {days}
    </div>
  );
}

export default function PeriodCalendar({
  periods,
  predictedStart,
  avgPeriodLength,
}: PeriodCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  function goPrev() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  }

  function goNext() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  }

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
      {/* Month header with navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-gray-700">
          {format(new Date(year, month), "MMMM yyyy")}
        </span>
        <button
          onClick={goNext}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
        >
          ›
        </button>
      </div>

      {/* Calendar grid */}
      <CalendarGrid
        year={year}
        month={month}
        periods={periods}
        predictedStart={predictedStart}
        avgPeriodLength={avgPeriodLength}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {[
          { color: "bg-pink-100", label: "Period" },
          { color: "bg-pink-50 border border-pink-200", label: "Predicted" },
          { color: "bg-pink-400", label: "Today" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-xs text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
