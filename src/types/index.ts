/** Supported contraceptive methods (Track tab adapts UI per type). */
export type ContraceptiveType =
  | "pills"
  | "ring"
  | "injection"
  | "patch"
  | "implant"
  | "other";

/** User-configured contraceptive schedule for the current method. */
export interface ContraceptiveSettings {
  type: ContraceptiveType;
  /** ISO date (YYYY-MM-DD) when the current cycle or course started. */
  cycleStartDate: string;
  /** Days to take or wear the contraceptive each cycle (e.g. 21 for pills/ring). */
  activeDays: number;
  /** How long the current course or dose remains effective. */
  durationDays: number;
  /** Minimum days until the next dose, change, or new cycle. */
  nextRangeMinDays: number;
  /** Maximum days until the next dose, change, or new cycle. */
  nextRangeMaxDays: number;
  /** Days off between active phases (e.g. pill-free week). */
  breakDays?: number;
  /** Total pills per pack (blister layout). */
  pillsPerPack?: number;
  /** Inactive or placebo days at the end of a pill pack. */
  placeboDays?: number;
}

/** A logged or predicted menstrual period. Dates are ISO YYYY-MM-DD. */
export interface Period {
  id: number;
  startDate: string;
  /** `null` while the period is ongoing or not yet ended. */
  endDate: string | null;
  source: "logged" | "predicted";
  createdAt: string;
  updatedAt: string;
}

/** Local notification preferences (period + contraceptive reminders). */
export interface NotificationSettings {
  periodReminderEnabled: boolean;
  /** Days before the expected period start to notify (0 = day of). */
  periodReminderDaysBefore: number;
  contraceptiveReminderEnabled: boolean;
  /** Daily reminder time in 24h format, e.g. "09:00". */
  reminderTime: string;
  /** Reminders for ring removal, injection due, pack change, etc. */
  cycleEventReminderEnabled: boolean;
}

/** Top-level app preferences stored in IndexedDB. */
export interface AppSettings {
  contraceptive: ContraceptiveSettings | null;
  notifications: NotificationSettings;
  /** Used for predictions when there is not enough cycle history. */
  defaultCycleLengthDays: number;
  defaultPeriodLengthDays: number;
  onboardingComplete: boolean;
}

export interface CycleStatsProps {
  avgCycleLength: number | null;
  avgPeriodLength: number | null;
  daysUntilNext: number | null;
}
