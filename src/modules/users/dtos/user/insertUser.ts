import { z } from "zod";

export const insertUser = z.object({
  username: z.string().min(3).max(255),
  email: z.email().max(255),
  password: z.string().min(6).max(255),
  role: z.enum(["admin", "user"]).default("user"),
});

export type InsertUser = z.infer<typeof insertUser>;
