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
  const [showEndForm, setShowEndForm] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const activePeriod = periods.find((p) => p.endDate === null);

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
    await update({ ...activePeriod, endDate, updatedAt: new Date().toISOString() });
    setShowEndForm(false);
    setEndDate(today());
  }

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
      {activePeriod && (
        <div className="flex items-center gap-2 bg-pink-50 rounded-xl px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <p className="text-sm text-pink-600">Period started {activePeriod.startDate}</p>
        </div>
      )}

      {showForm ? (
        <LogForm
          startDate={startDate}
          setStartDate={setStartDate}
          handleLogPeriod={handleLogPeriod}
          setShowForm={setShowForm}
        />
      ) : showEndForm && activePeriod ? (
        <LogForm
          label="When did it end?"
          startDate={endDate}
          setStartDate={setEndDate}
          handleLogPeriod={handleEndPeriod}
          setShowForm={setShowEndForm}
          min={activePeriod.startDate}
        />
      ) : (
        <div className="flex gap-2">
          {activePeriod && (
            <button
              onClick={() => {
                setEndDate(today());
                setShowEndForm(true);
              }}
              className="flex-1 py-3 rounded-xl border border-pink-200 text-pink-400 text-sm font-medium"
            >
              End period
            </button>
          )}

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
