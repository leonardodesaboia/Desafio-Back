import { uuid, pgTable, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const logTable = pgTable("log", {
  uuid: uuid().primaryKey().defaultRandom(),
  link_owner_id: uuid("link_owner_id").references(() => usersTable.id),
  referred_link: uuid("referred_link").references(() => usersTable.id),
  created_at: timestamp("created_at").defaultNow(),
});
