import { getRepository, Like } from "typeorm"
import { Posts } from "../../entities/Post"

export class SearchPostService {
  async execute(q: string) {
    
    const repo = getRepository(Posts);
    const blogPosts = repo.find({
      where: [
        {title: Like(`%${q}%`)},
        {content: Like(`%${q}%`)}
      ],
      relations: ['user'],
    });
    
    return blogPosts;
  }
}