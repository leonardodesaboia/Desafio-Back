import type { InsertUser } from "./dtos/user/insertUser.js";
import type { LoginUser } from "./dtos/user/loginUser.js";
import { db } from "../../db/connection.js";
import { schema } from "../../db/schema/index.js";
import { eq, count, desc } from "drizzle-orm";

export class UserRepo {
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
        email: schema.users.email,
        created_at: schema.users.created_at,
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
        email: schema.users.email,
        referred_total: count(schema.log.link_owner_id),
      })
      .from(schema.users)
      .leftJoin(schema.log, eq(schema.users.id, schema.log.link_owner_id))
      .groupBy(schema.users.id)
      .orderBy(desc(count(schema.log.link_owner_id)))
      .limit(5);

    console.log(result);

    if (!result) {
      throw new Error("Users not found");
    }

    return result;
  }

  async getUserById(id: string) {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));

    if (!result) {
      throw new Error("User not found");
    }

    return result;
  }

  async addLog(referred_link: string, link_owner_id: string) {

    const values = { 
      referred_link, 
      link_owner_id 
    };
    
    console.log('Valores a serem inseridos:', values);
    
    const result = await db
      .insert(schema.log)
      .values(values)
      .returning();

    console.log('Resultado da inserção:', result);

    if (!result) {
      throw new Error("Log not created");
    }

    return result;
  }

  async getUserByLink(link: string) {
    const result = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.link, link));

    if (!result || result.length === 0) {
      return null;
    }

    return result[0];
  }

  async getUserPoints(userId: string) {
    const result = await db
      .select({ count: count() })
      .from(schema.log)
      .where(eq(schema.log.link_owner_id, userId));

    return result[0]?.count || 0;
  }
}
