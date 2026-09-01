import { format } from "date-fns";

interface LogFormProps {
  startDate: string;
  setStartDate: (date: string) => void;
  handleLogPeriod: () => void;
  setShowForm: (show: boolean) => void;
}

export default function LogForm({
  startDate,
  setStartDate,
  handleLogPeriod,
  setShowForm,
}: LogFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-700">When did it start?</p>
      <input
        type="date"
        value={startDate}
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
