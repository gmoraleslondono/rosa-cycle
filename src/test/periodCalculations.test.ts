import { describe, it, expect } from "vitest";
import {
  getAvgCycleLength,
  getAvgPeriodLength,
  predictNextPeriod,
  daysUntilNextPeriod,
} from "../utils/periodCalculations";
import type { Period } from "../types";

// Mock data for testing
const mockPeriods: Period[] = [
  {
    id: 1,
    startDate: "2026-01-01",
    endDate: "2026-01-05",
    source: "logged",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, // 5 days long
  {
    id: 2,
    startDate: "2026-01-29",
    endDate: "2026-02-02",
    source: "logged",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, // 28 days after period 1, 5 days long
  {
    id: 3,
    startDate: "2026-02-26",
    endDate: "2026-03-02",
    source: "logged",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, // 28 days after period 2, 5 days long
];

describe("getAvgCycleLength", () => {
  it("returns null when there are no periods", () => {
    const result = getAvgCycleLength([]);
    expect(result).toBeNull();
  });

  it("returns null when there is only one period", () => {
    const result = getAvgCycleLength([mockPeriods[0]]);
    expect(result).toBeNull();
  });

  it("returns 28 when periods are 28 days apart", () => {
    const result = getAvgCycleLength(mockPeriods);
    expect(result).toBe(28);
  });
});

describe("getAvgPeriodLength", () => {
  it("returns null when there are no periods", () => {
    const result = getAvgPeriodLength([]);
    expect(result).toBeNull();
  });

  it("returns null when all periods are ongoing", () => {
    const ongoing: Period[] = [
      {
        id: 1,
        startDate: "2026-01-01",
        endDate: null,
        source: "logged",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    const result = getAvgPeriodLength(ongoing);
    expect(result).toBeNull();
  });

  it("returns 5 when all periods last 5 days", () => {
    const result = getAvgPeriodLength(mockPeriods);
    expect(result).toBe(5);
  });

  it("ignores ongoing periods when calculating average", () => {
    const mixed: Period[] = [
      ...mockPeriods,
      {
        id: 4,
        startDate: "2026-03-26",
        endDate: null,
        source: "logged",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, // ongoing, should be ignored
    ];
    const result = getAvgPeriodLength(mixed);
    expect(result).toBe(5); // same result, ongoing period ignored
  });
});

describe("predictNextPeriod", () => {
  it("returns null when there are no periods", () => {
    const result = predictNextPeriod([]);
    expect(result).toBeNull();
  });

  it("uses 28 days as default when there is only one period", () => {
    const single: Period[] = [
      {
        id: 1,
        startDate: "2026-01-01",
        endDate: "2026-01-05",
        source: "logged",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    const result = predictNextPeriod(single);
    // Jan 1 + 28 days = Jan 29
    expect(result?.toISOString().split("T")[0]).toBe("2026-01-29");
  });

  it("predicts based on average cycle when multiple periods exist", () => {
    const result = predictNextPeriod(mockPeriods);
    // last period Feb 26 + 28 days avg = Mar 26
    expect(result?.toISOString().split("T")[0]).toBe("2026-03-26");
  });
});

describe("daysUntilNextPeriod", () => {
  it("returns null when there are no periods", () => {
    const result = daysUntilNextPeriod([]);
    expect(result).toBeNull();
  });

  it("returns a number when periods exist", () => {
    const result = daysUntilNextPeriod(mockPeriods);
    expect(typeof result).toBe("number");
  });
});
