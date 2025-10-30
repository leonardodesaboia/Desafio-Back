import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { logTable } from "../../../../db/schema/log.js";

export const selectLog = createSelectSchema(logTable);

export type SelectLog = z.infer<typeof selectLog>;
