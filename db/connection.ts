import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schemas";

declare module global {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined
}

let postgresSqlClient;
let databaseUrl = process.env.POSTGRESQL_DB_URL!;

if (process.env.NODE_ENV !== "production") {
  if (!global.postgresSqlClient) {
    global.postgresSqlClient = postgres(databaseUrl)
  }
  postgresSqlClient = global.postgresSqlClient
} else {
  postgresSqlClient = postgres(databaseUrl)
}

export const db = drizzle(postgresSqlClient, {schema})