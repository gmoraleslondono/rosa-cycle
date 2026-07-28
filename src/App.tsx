import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeriodView from "./views/PeriodView";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<PeriodView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
