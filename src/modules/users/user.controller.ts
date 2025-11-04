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
              console.log(`Email de pontos enviado para ${referrer.email}`);
            } catch (emailError) {
              console.error("Erro ao enviar email de pontos:", emailError);
            }
          } else {
            console.warn(`Código de indicação inválido: ${body.referredBy}`);
          }
        } catch (error) {
          console.error("Erro ao criar log de indicação:", error);
        }
      }

      return reply.status(201).send({
        token
      });
    } catch (error) {
      console.error("Error registering user:", error);
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


      return reply.send({
        token
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      if (error instanceof Error) {
        return reply.status(401).send({ error: error.message });
      }
      return reply.status(500).send({ error: "User not logged in" });
    }
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.userService.getUsers();
      return reply.send(users);
    } catch (error) {
      console.error("Error getting users:", error);
      return reply.status(500).send({ error: "Users not found" });
    }
  }

  async getRanking(request: FastifyRequest, reply: FastifyReply) {
    try {
      const ranking = await this.userService.getRanking();
      return reply.send(ranking);
    } catch (error) {
      console.error("Error getting ranking:", error);
      return reply.status(500).send({ error: "Ranking not found" });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      if (!id) {
        return reply.status(400).send({ error: "User ID is required" });
      }

      const user = await this.userService.getUserById(id);
      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }
      return reply.send(user);
    } catch (error) {
      console.error("Error getting user by id:", error);
      return reply.status(500).send({ error: "Error fetching user" });
    }
  }

  async sendTop5Emails(request: FastifyRequest, reply: FastifyReply) {
    try {
      console.log("Iniciando envio de emails para o Top 5...");
      
      const ranking = await this.userService.getRanking();
      
      if (!ranking || ranking.length === 0) {
        return reply.status(404).send({ error: "Nenhum usuário encontrado no ranking" });
      }

      const top5WithEmails = ranking.map((user) => ({
        email: user.email,
        username: user.username,
        points: user.referred_total || 0,
      }));

      const validUsers = top5WithEmails.filter(user => user.email);

      if (validUsers.length === 0) {
        return reply.status(400).send({ error: "Nenhum usuário do Top 5 possui email válido" });
      }

      const result = await this.emailService.sendTop5Emails(validUsers);

      return reply.send({
        message: "Emails enviados para o Top 5",
        ...result,
      });
    } catch (error) {
      console.error("Error sending Top 5 emails:", error);
      return reply.status(500).send({ error: "Erro ao enviar emails" });
    }
  }
}

const userService = new UserService(new UserRepo());
export const userController = new UserController(userService);
