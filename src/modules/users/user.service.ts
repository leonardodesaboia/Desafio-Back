import { UserRepo } from "./user.repository.js";
import type { InsertUser } from "./dtos/user/insertUser.js";
import type { LoginUser } from "./dtos/user/loginUser.js";

export class UserService {
  constructor(private readonly userRepo: UserRepo){}

  async registerUser(user: InsertUser) {
    return this.userRepo.registerUser(user);
  }

  async loginUser(user: LoginUser) {
    return this.userRepo.loginUser(user);
  }

  async getUsers() {
    return this.userRepo.getUsers();
  }

  async getRanking() {
    return this.userRepo.getRanking();
  }

  async getUserById(id: string) {
    return this.userRepo.getUserById(id);
  }

  async addLog(referred_link: string, link_owner_id: string) {
    return this.userRepo.addLog(referred_link, link_owner_id);
  }

  async getUserByLink(link: string) {
    return this.userRepo.getUserByLink(link);
  }

  async getUserPoints(userId: string) {
    return this.userRepo.getUserPoints(userId);
  }
}
