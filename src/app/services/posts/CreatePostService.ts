import { request } from "express";
import { getRepository } from "typeorm";
import { Posts } from "../../entities/Post";
import { User } from "../../entities/User";

interface IPostRequest {
  title: string;
  content: string;
  userId: string;
}

export class CreatePostService { 
  async execute({title, content, userId} : IPostRequest): Promise<Posts | Error>{
    const repoUser = getRepository(User);
    const repoPost = getRepository(Posts);
    
    if(await repoUser.findOne({id: request.id})) {
      return new Error('User not find');
    }

    const post = repoPost.create({title, content, userId});

    await repoPost.save(post);

    return post;
  }
}
