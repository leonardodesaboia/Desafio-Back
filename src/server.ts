// ESM
import Fastify from "fastify";
import userRoutes from "./modules/users/user.routes.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(userRoutes, { prefix: "/users" });

// Declare a route
fastify.get("/health-check", function (request, reply) {
  reply.send({ status: "OK" });
});

async function main() {
  // Run the server!
  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    } else {
      console.log(`Server is now listening on ${address}`);
    }
  });
}
