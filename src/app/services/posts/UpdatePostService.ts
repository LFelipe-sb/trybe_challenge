import { getRepository } from "typeorm";
import { Posts } from "../../entities/Post";

interface IPostRequest {
  id: string,
  title: string,
  content: string
}

export class UpdatePostService { 
  async execute({id, title, content}: IPostRequest) {
    const repo = getRepository(Posts);

    const blogPost = await repo.findOne(id);

    if(!blogPost) {
      return new Error('Post not found');
    }

    blogPost.title = title;
    blogPost.content = content;
    blogPost.updated = new Date();

    await repo.save(blogPost);

    return blogPost;
  }
}
