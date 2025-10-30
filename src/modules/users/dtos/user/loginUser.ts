import { z } from "zod";

export const loginUser = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginUser = z.infer<typeof loginUser>;
