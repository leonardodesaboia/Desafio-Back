import type { FastifyInstance } from "fastify";
import userController from "./user.controller.js";

async function userRoutes(server: FastifyInstance){
   
    server.post('/', userController.registerUser)
    server.post('/login', userController.loginUser)
    server.post('/ranking', userController.getRanking)

    server.get('/', userController.getUsers)
}

export default userRoutes;