import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "../../../../db/schema/users.js";

export const insertUser = createInsertSchema(usersTable, {
  id: z.uuid(),
  username: z.string().min(3).max(255),
  email: z.email().max(255),
  password: z.string().min(6).max(255),
  role: z.enum(["admin", "user"]).default("user"),
  link: z.url().max(255),
});

export type InsertUser = z.infer<typeof insertUser>;
