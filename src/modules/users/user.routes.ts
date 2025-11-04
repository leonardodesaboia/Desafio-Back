import type { FastifyInstance } from "fastify";
import {userController} from "./user.controller.js";

async function userRoutes(server: FastifyInstance){
   
    server.post('/', (req, reply) => userController.registerUser(req, reply))
    server.post('/login', (req, reply) => userController.loginUser(req, reply))
    server.get('/ranking', (req, reply) => userController.getRanking(req, reply))
    server.post('/send-top5-emails', (req, reply) => userController.sendTop5Emails(req, reply))

    server.get('/', (req, reply) => userController.getUsers(req, reply))
    server.get('/:id', (req, reply) => userController.getUserById(req, reply))
}

export default userRoutes;