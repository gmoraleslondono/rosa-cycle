import { format } from "date-fns";

interface LogFormProps {
  startDate: string;
  setStartDate: (date: string) => void;
  handleLogPeriod: () => void;
  setShowForm: (show: boolean) => void;
  min?: string;
  label?: string;
}

export default function LogForm({
  startDate,
  setStartDate,
  handleLogPeriod,
  setShowForm,
  min,
  label = "When did it start?",
}: LogFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <input
        type="date"
        value={startDate}
        min={min}
        max={format(new Date(), "yyyy-MM-dd")}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-pink-400"
      />
      <div className="flex gap-2">
        <button
          onClick={() => setShowForm(false)}
          className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleLogPeriod}
          className="flex-1 py-2 rounded-xl bg-pink-400 text-white text-sm font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
}
