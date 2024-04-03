import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

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

export const db = drizzle(postgresSqlClient)