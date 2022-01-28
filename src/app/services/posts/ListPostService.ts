import { getRepository } from "typeorm";
import { Posts } from "../../entities/Post";

export class ListPostService {
  async execute(id?: string) {
    const repo = getRepository(Posts);

      const posts = await repo.find({
          relations: ['user'],
        });
        
    return posts;
  }
}