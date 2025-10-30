import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { logTable } from "../../../../db/schema/log.js";

export const insertLog = createInsertSchema(logTable);

export type InsertLog = z.infer<typeof insertLog>;
