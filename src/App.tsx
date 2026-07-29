import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PeriodView from "./views/PeriodView";
import ContraceptiveView from "./views/ContraceptiveView";
import InsightsView from "./views/InsightsView";
import SettingsView from "./views/SettingsView";
import BottomNav from "./components/shared/BottomNav";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<Navigate to="/period" replace />} />
            <Route path="/track" element={<ContraceptiveView />} />
            <Route path="/period" element={<PeriodView />} />
            <Route path="/insights" element={<InsightsView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
