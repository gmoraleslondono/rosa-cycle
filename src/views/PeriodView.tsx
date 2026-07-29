import { useEffect } from "react";
import { usePeriodStore } from "../stores/period";
import CycleStats from "../components/period/CycleStats";
import {
  getAvgCycleLength,
  getAvgPeriodLength,
  daysUntilNextPeriod,
} from "../utils/periodCalculations";

export default function PeriodView() {
  const { periods, load, loading } = usePeriodStore();

  // call the load function to load periods from IndexedDB when the view opens
  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // if (periods.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <p className="text-gray-400">No periods found</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-medium text-gray-800">Period tracker</h1>
        <p className="text-sm text-gray-400">Track and predict your cycle</p>
      </div>

      {/* Cycle stats */}
      <CycleStats
        avgCycleLength={getAvgCycleLength(periods)}
        avgPeriodLength={getAvgPeriodLength(periods)}
        daysUntilNext={daysUntilNextPeriod(periods)}
      />

      {/* Calendar */}
      <div className="bg-gray-100 rounded-2xl p-4 text-center text-gray-400 text-sm h-64">
        PeriodCalendar goes here
      </div>

      {/* Log button */}
      <div className="bg-gray-100 rounded-2xl p-4 text-center text-gray-400 text-sm">
        PeriodLogButton goes here
      </div>
    </div>
  );
}
