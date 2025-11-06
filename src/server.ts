import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import userRoutes from "./modules/users/user.routes.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "fallback-secret-for-development",
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  }
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  reply.status(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    error: error.name || "Internal Server Error",
    message: error.message || "An unexpected error occurred"
  });
});

fastify.get("/health-check", (request, reply) => {
  reply.send({ status: "OK" });
});

fastify.register(userRoutes, { prefix: "/users" });

async function main() {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0'
    });
    console.log(`Server is now listening on http://0.0.0.0:${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
