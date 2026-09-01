import { useState } from "react";
import { format } from "date-fns";
import { usePeriodStore } from "../../stores/period";
import LogForm from "./LogForm";

function today(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export default function PeriodLogButton() {
  const { periods, add, update } = usePeriodStore();
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState(today);

  async function handleLogPeriod() {
    await add({
      startDate,
      endDate: null,
      source: "logged",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setShowForm(false);
    setStartDate(today());
  }

  async function handleEndPeriod() {
    if (!activePeriod) return;
    await update({ ...activePeriod, endDate: format(new Date(), "yyyy-MM-dd") });
  }

  //find if there is a period with no end date
  const activePeriod = periods.find((p) => p.endDate === null);

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
      {/* Active period banner */}
      {activePeriod && (
        <div className="flex items-center gap-2 bg-pink-50 rounded-xl px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <p className="text-sm text-pink-600">Period started {activePeriod.startDate}</p>
        </div>
      )}

      {/* Show form or buttons */}
      {showForm ? (
        <LogForm
          startDate={startDate}
          setStartDate={setStartDate}
          handleLogPeriod={handleLogPeriod}
          setShowForm={setShowForm}
        />
      ) : (
        <div className="flex gap-2">
          {/* End period button — only when active */}
          {activePeriod && (
            <button
              onClick={handleEndPeriod}
              className="flex-1 py-3 rounded-xl border border-pink-200 text-pink-400 text-sm font-medium"
            >
              End period
            </button>
          )}

          {/* Log period button — only when no active period */}
          {!activePeriod && (
            <button
              onClick={() => {
                setStartDate(today());
                setShowForm(true);
              }}
              className="flex-1 py-3 rounded-xl bg-pink-400 text-white text-sm font-medium"
            >
              Log period
            </button>
          )}
        </div>
      )}
    </div>
  );
}
