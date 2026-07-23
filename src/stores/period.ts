import { create } from "zustand";
import type { Period } from "../types";
import { getAllPeriods, savePeriod, updatePeriod, deletePeriod } from "../db";

interface PeriodStore {
  periods: Period[];
  loading: boolean;
  load: () => Promise<void>;
  add: (period: Omit<Period, "id">) => Promise<void>;
  update: (period: Period) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export const usePeriodStore = create<PeriodStore>((set, get) => ({
  periods: [],
  loading: false,

  load: async () => {
    set({ loading: true });
    const periods = await getAllPeriods();
    periods.sort((a, b) => a.startDate.localeCompare(b.startDate));
    set({ periods, loading: false });
  },
  add: async (period) => {
    const saved = await savePeriod(period);
    set({ periods: [...get().periods, saved] });
  },
  update: async (period) => {
    await updatePeriod(period);
    set({ periods: get().periods.map((p) => (p.id === period.id ? period : p)) });
  },
  delete: async (id) => {
    await deletePeriod(id);
    set({ periods: get().periods.filter((p) => p.id !== id) });
  },
}));
