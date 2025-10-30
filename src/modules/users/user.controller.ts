import type { FastifyReply, FastifyRequest} from "fastify";
import { UserService } from "./user.service.js";
import type { LoginUser } from "./dtos/user/loginUser.js";
import type { InsertUser } from "./dtos/user/insertUser.js";

export default class userController {

    constructor(private readonly userService: UserService){}

    static async registerUser(request: FastifyRequest, reply: FastifyReply){
        return this.userService.registerUser(request.body as InsertUser)
    }
    
    static async loginUser(request: FastifyRequest, reply: FastifyReply){
        return this.userService.loginUser(request.body as LoginUser)
    }
    
    static async getUsers(request: FastifyRequest, reply: FastifyReply){
        return this.userService.getUsers()
    }
    
    static async getRanking(request: FastifyRequest, reply: FastifyReply){
        return this.userService.getRanking()
    }
}

