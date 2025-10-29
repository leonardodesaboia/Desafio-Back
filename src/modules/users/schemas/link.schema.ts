import { integer, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema.js"

export const linkTable = pgTable("link", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id),
  link: varchar("link", { length: 255 }).notNull(),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull()
});