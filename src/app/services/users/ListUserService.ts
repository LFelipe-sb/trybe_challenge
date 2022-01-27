import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export class ListUserService {
  async execute(id?: string) {
    const repo = getRepository(User);

      let users; 

      id ?
        users = await repo.find({id}) :
        users = await repo.find();

    return users;
  }
}