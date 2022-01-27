import { getRepository } from "typeorm";
import { User } from "../../entities/User";

interface IUserRequest {
  displayName: string;
  email: string;
  password: string;
  image: string;
}

export class CreateUserService {
  async execute({displayName, email, password, image}:IUserRequest) : Promise<User | Error> {
    const repo = getRepository(User);
    
    if(await repo.findOne({email}))
      return new Error('Usuário já existe');
    
    const user = repo.create({
      displayName,
      email,
      password,
      image
    });

    await repo.save(user);

    return user;
  }
}