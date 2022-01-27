import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export class DeleteUserService { 
  async execute(id: string) {
    const repo = getRepository(User);

    if(!await repo.findOne(id)) {
      return new Error('User not find');
    }

    await repo.delete(id);
  }
}
