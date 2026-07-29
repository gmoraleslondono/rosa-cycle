import { NavLink } from "react-router-dom";
import { Pill, Calendar, BarChart2, Settings } from "lucide-react";

const tabs = [
  { to: "/track", icon: Pill, label: "Track" },
  { to: "/period", icon: Calendar, label: "Period" },
  { to: "/insights", icon: BarChart2, label: "Insights" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
            ${isActive ? "text-pink-400" : "text-gray-400"}`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
