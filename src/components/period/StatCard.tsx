interface StatCardProps {
  label: string;
  value: string;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-3 flex flex-col items-center gap-1">
      <span className="text-xl font-medium text-pink-400">{value}</span>
      <span className="text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}
