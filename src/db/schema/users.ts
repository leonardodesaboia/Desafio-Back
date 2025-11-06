import { varchar, pgTable, pgEnum, uuid, timestamp} from "drizzle-orm/pg-core"; 

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar().notNull(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
  role: userRoleEnum().notNull().default("user"),
  link: uuid().notNull().defaultRandom().unique(),
  created_at: timestamp("created_at").defaultNow()
});