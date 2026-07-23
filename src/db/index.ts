import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Period } from "../types";

interface RosaCycleDB extends DBSchema {
  periods: {
    key: number;
    value: Period;
  };
}

//Open the database
let dbPromise: Promise<IDBPDatabase<RosaCycleDB>> | null = null;

//Get the database
export async function getDB(): Promise<IDBPDatabase<RosaCycleDB>> {
  if (!dbPromise) {
    dbPromise = openDB<RosaCycleDB>("rosacycle-db", 1, {
      upgrade(database) {
        database.createObjectStore("periods", { keyPath: "id", autoIncrement: true });
      },
    });
  }
  return dbPromise;
}

// CRUD functions for period
//Get all periods
export async function getAllPeriods(): Promise<Period[]> {
  const database = await getDB();
  return database.getAll("periods");
}

// Save a new period - id is created automatically
export async function savePeriod(period: Omit<Period, "id">): Promise<Period> {
  const database = await getDB();
  const newId = await database.add("periods", period as Period);
  return { id: newId as number, ...period };
}

// Update an existing period
export async function updatePeriod(period: Period): Promise<void> {
  const database = await getDB();
  await database.put("periods", period);
}

// Delete a period by id
export async function deletePeriod(id: number): Promise<void> {
  const database = await getDB();
  await database.delete("periods", id);
}
