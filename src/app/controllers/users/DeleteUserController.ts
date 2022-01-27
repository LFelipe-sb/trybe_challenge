import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/DeleteUserService';

export class DeleteUserController {
  async handle(request: Request, response: Response) {

    const service = new DeleteUserService();

    const result = await service.execute(request.id)

    if(result instanceof Error) {
      return response.status(400).json({message: result.message});
    }

    return response.status(204).end();
  }

}
