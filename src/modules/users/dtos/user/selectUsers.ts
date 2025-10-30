import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { usersTable } from "../../../../db/schema/users.js";

export const selectUser = createSelectSchema(usersTable);

export type SelectUser = z.infer<typeof selectUser>;
