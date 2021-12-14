/* eslint-disable @typescript-eslint/no-explicit-any */
/* https://github.com/vitaly-t/pg-promise/issues/175#issuecomment-761894356 */
import pgLib from "pg-promise";

const pgp = pgLib();

type IDatabaseScope = {
  db: pgLib.IDatabase<any>;
};

const createSingleton: <T>(name: string, create: () => T) => T = (
  name,
  create
) => {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
};

export const getDB: () => IDatabaseScope = () => {
  return createSingleton<IDatabaseScope>("usa-name-db", () => {
    return {
      db: pgp({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    };
  });
};
