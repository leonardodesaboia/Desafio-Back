import type { InsertUser } from "./dtos/user/insertUser.js";
import type { LoginUser } from "./dtos/user/loginUser.js";
import { db } from "../../db/connection.js";
import { schema } from "../../db/schema/index.js";
import { eq, count, desc } from "drizzle-orm";

export class UserService {
  async registerUser(user: InsertUser) {
    const result = await db.insert(schema.users).values(user).returning();

    if (!result) {
      throw new Error("User not created");
    }

    return result;
  }

  async loginUser(user: LoginUser) {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, user.email));

    if (!result) {
      throw new Error("User not found");
    }

    return result;
  }

  async getUsers() {
    const result = await db
      .select({
        username: schema.users.username,
        referred_total: count(schema.log.link_owner_id),
      })
      .from(schema.users)
      .leftJoin(schema.log, eq(schema.users.id, schema.log.link_owner_id))
      .groupBy(schema.users.id)
      .orderBy(desc(count(schema.log.link_owner_id)));

    if (!result) {
      throw new Error("Users not found");
    }

    return result;
  }

  async getRanking() {
    const result = await db
      .select({
        username: schema.users.username,
        referred_total: count(schema.log.link_owner_id),
      })
      .from(schema.users)
      .leftJoin(schema.log, eq(schema.users.id, schema.log.link_owner_id))
      .groupBy(schema.users.id)
      .orderBy(desc(count(schema.log.link_owner_id)))
      .limit(5);

    if (!result) {
      throw new Error("Users not found");
    }

    return result;
  }
}
