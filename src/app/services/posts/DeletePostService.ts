import { getRepository } from "typeorm";
import { Posts } from "../../entities/Post";

export class DeletePostService {
  async execute(id: string, userId: string) {
    const repo = getRepository(Posts);

    const post = await repo.findOne(id);

    if(!post) {
      return new Error('Post não existe');
    }

    if(post?.userId != userId) {
      return new Error('Usuário não autorizado');
    }
    
    await repo.delete(id);
  }
}