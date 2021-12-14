import { NameRow } from "types";
import { getDB } from "./db";

export const queryAll: (
  sql: string,
  params: (string | number)[]
) => Promise<Array<NameRow>> = async (sql, params) => {
  const { db } = getDB();
  return await db.any(sql, params);
};

export const queryOne: (
  sql: string,
  params?: (string | number)[]
) => Promise<NameRow> = async (sql, params) => {
  const { db } = getDB();
  return await db.one(sql, params);
};
