import { Request, Response } from 'express';
import { CreateUserService } from '../../services/users/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response) {

    const service = new CreateUserService();

    const {displayName, email, password, image} = request.body;
    const result = await service.execute({displayName, email, password, image});

    if(result instanceof Error) {
      return response.status(400).json({message: result.message});
    }

    return response.status(201).json(result);

  }
}