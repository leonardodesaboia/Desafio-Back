import { uuid, pgTable, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const logTable = pgTable("log", {
  uuid: uuid().primaryKey().defaultRandom(),
  link_owner_id: uuid("user_id").references(() => usersTable.id),
  visitor_id: uuid("user_id").references(() => usersTable.id),
  created_at: timestamp("created_at").defaultNow(),
});