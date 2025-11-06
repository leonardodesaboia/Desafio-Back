import type { FastifyInstance } from "fastify";
import { userController } from "./user.controller.js";

async function userRoutes(server: FastifyInstance) {

    // Registrar o usuario
    server.post("/", async (req, reply) => {
        return userController.registerUser(req, reply);
    });

    // Logar o usuario
    server.post("/login", async (req, reply) => {
        return userController.loginUser(req, reply);
    });

    // GET usuarios do ranking
    server.get("/ranking", async (req, reply) => {
        return userController.getRanking(req, reply);
    });

    // GET usuarios geral
    server.get("/", async (req, reply) => {
        return userController.getUsers(req, reply);
    });

    // GET usuario por id
    server.get("/:id", async (req, reply) => {
        return userController.getUserById(req, reply);
    });
}

export default userRoutes;