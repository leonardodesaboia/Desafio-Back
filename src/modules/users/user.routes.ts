import type { FastifyInstance } from "fastify";
import { userController } from "./user.controller.js";

async function userRoutes(server: FastifyInstance) {
    
    server.post("/", async (req, reply) => {
        return userController.registerUser(req, reply);
    });

    server.post("/login", async (req, reply) => {
        return userController.loginUser(req, reply);
    });

    server.get("/ranking", async (req, reply) => {
        return userController.getRanking(req, reply);
    });

    server.get("/", async (req, reply) => {
        return userController.getUsers(req, reply);
    });

    server.get("/:id", async (req, reply) => {
        return userController.getUserById(req, reply);
    });
}

export default userRoutes;