import { z } from "zod";

export const insertUser = z.object({
  id: z.uuid(),
  username: z.string().min(3).max(255),
  email: z.email().max(255),
  password: z.string().min(6).max(255),
  role: z.enum(["admin", "user"]).default("user"),
  link: z.uuid(),
  created_at: z.date(),
});

export type InsertUser = z.infer<typeof insertUser>;
