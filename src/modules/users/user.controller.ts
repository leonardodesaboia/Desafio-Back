import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service.js";
import type { LoginUser } from "./dtos/user/loginUser.js";
import type { InsertUser } from "./dtos/user/insertUser.js";
import { UserRepo } from "./user.repository.js";
import { EmailService } from "./email.service.js";

class UserController {
  private emailService: EmailService;
  
  constructor(private readonly userService: UserService) {
    this.emailService = new EmailService();
  }

  async registerUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as InsertUser & { referredBy?: string };

      if (!body.username || !body.email || !body.password) {
        return reply.status(400).send({
          error: "Missing fields"
        });
      }

      const result = await this.userService.registerUser(body);
      const user = Array.isArray(result) ? result[0] : result;

      const token = request.server.jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        link: user.link
      });

      if (body.referredBy) {
        try {
          const referrer = await this.userService.getUserByLink(body.referredBy);

          if (referrer) {
            await this.userService.addLog(user.id, referrer.id);

            try {
              const totalPoints = await this.userService.getUserPoints(referrer.id);
              await this.emailService.sendPointsEarnedEmail(
                referrer.email,
                referrer.username,
                user.username,
                totalPoints
              );
            } catch (error) {
              // Referral log error silently handled
            }
          }
        } catch (error) {
          // Referral log error silently handled
        }
      }

      return reply.status(201).send({
        token
      });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(500).send({ error: "User not created" });
    }
  }

  async loginUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as LoginUser;

      if (!body.email || !body.password) {
        return reply.status(400).send({
          error: "Missing fields"
        });
      }

      const result = await this.userService.loginUser(body);
      const user = Array.isArray(result) ? result[0] : result;

      if (!user) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      if (user.password !== body.password) {
        return reply.status(401).send({ error: "Invalid credentials" });
      }

      const token = request.server.jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        link: user.link
      });


      return reply.status(200).send({
        token
      });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(401).send({ error: error.message });
      }
      return reply.status(500).send({ error: "User not logged in" });
    }
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.userService.getUsers();
      return reply.status(200).send(users);
    } catch (error) {
      return reply.status(500).send({ error: "Users not found" });
    }
  }

  async getRanking(request: FastifyRequest, reply: FastifyReply) {
    try {
      const ranking = await this.userService.getRanking();

      // Enviar emails para o Top 5 em background (não bloqueia a resposta)
      if (ranking && ranking.length > 0) {
        setImmediate(async () => {
          try {
            await this.emailService.sendTop5EmailsFromRanking(ranking);
          } catch (emailError) {
            // Email error silently handled
          }
        });
      }

      return reply.status(200).send(ranking);
    } catch (error) {
      return reply.status(500).send({ error: "Ranking not found" });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      if (!id) {
        return reply.status(400).send({ error: "User ID is required" });
      }

      const result = await this.userService.getUserById(id);
      const user = Array.isArray(result) ? result[0] : result;

      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }
      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(500).send({ error: "Error fetching user" });
    }
  }
}

const userService = new UserService(new UserRepo());
export const userController = new UserController(userService);
