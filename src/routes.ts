import Fastify from "fastify";
import userRoutes from "./modules/users/user.routes.js";

const fastify = Fastify({
  logger: true,
});

//health check
fastify.get("/health-check", function (request, reply) {
    reply.send({ status: "OK" });
  });

  //rotas principais
fastify.register(userRoutes, { prefix: "/api/users" });

