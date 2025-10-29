import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/modules/admin/schemas/admin.schema.ts",
    "./src/modules/users/schemas/users.schema.ts",
    "./src/modules/users/schemas/link.schema.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
