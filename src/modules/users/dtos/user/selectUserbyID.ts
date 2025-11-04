import { z } from "zod";

export const selectUserById = z.object({
  username: z.string().min(3).max(255),
  email: z.email().max(255),
  link: z.uuid(),
  created_at: z.date(),
});

export type SelectUserById = z.infer<typeof selectUserById>;
