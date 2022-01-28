import {Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { CreatePostService } from '../../services/posts/CreatePostService';

export class CreatePostController { 
  async handle(request: Request, response: Response) {

    const errors = validationResult(request);
    
    if (!errors.isEmpty()){
      const error = errors.array()[0];
      return response.status(400).send({message: error.msg})
    }

    const {title, content} = request.body;

    const service = new CreatePostService();

    const result: any = await service.execute({title, content, userId: request.id});

    if(result instanceof Error) {
      return response.status(400).json(result.message);
    }

    delete result.id;
    delete result.published;
    delete result.updated;

    return response.status(201).json(result);
  }
}
