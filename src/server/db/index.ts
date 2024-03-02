import { drizzle } from "drizzle-orm/libsql";

import { createClient, type Client } from '@libsql/client';

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Client | undefined;
};

export const conn =
  globalForDb.conn ?? createClient({
    url: env.TURSO_CONNECTION_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });