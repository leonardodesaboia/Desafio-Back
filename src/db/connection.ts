import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";
import { schema } from "./schema/index.js";

export const sql = postgres (process.env.DATABASE_URL!)
export const db = drizzle(sql, {
    schema,
    casing: "snake_case",
})