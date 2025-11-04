// ESM
import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import userRoutes from "./modules/users/user.routes.js";

const fastify = Fastify({
  logger: true,
});

// ✅ Registra JWT
await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "fallback-secret-for-development",
  sign: {
    expiresIn: "7d"
  }
});

// ✅ Libera CORS para todo mundo
await fastify.register(cors, {
  origin: "*", // permite qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  reply.status(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    error: error.name || "Internal Server Error",
    message: error.message || "An unexpected error occurred"
  });
});

// Rotas
fastify.register(userRoutes, { prefix: "/users" });

fastify.get("/health-check", (request, reply) => {
  reply.send({ status: "OK" });
});

// Inicialização
async function main() {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server is now listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
