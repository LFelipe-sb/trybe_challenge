import { getRepository } from "typeorm";
import { Posts } from "../../entities/Post";

export class ListPostService {
  async execute(id?: string) {
    const repo = getRepository(Posts);

    let posts; 

    id ?
      posts = await repo.find({
        where: {id},
        relations: ['user'],
      }) :
      posts = await repo.find({
        relations: ['user'],
      });

    return posts;
  }
}