import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const adminTable = pgTable("admin", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});