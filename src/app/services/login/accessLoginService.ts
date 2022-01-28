import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export class AccessLoginService {
  async execute(email: string, password: string) {
    const repo = getRepository(User);

    const user = await repo.findOne({email, password});

    return user;
  }
}
