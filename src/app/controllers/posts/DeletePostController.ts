import { Request, Response } from 'express';
import { DeletePostService } from '../../services/posts/DeletePostService';

export class DeletePostController {
  async handle(request: Request, response: Response) {
    const {id} = request.params;
    const userId = request.id;

    try {
      const service = new DeletePostService();
      const result = await service.execute(id, userId);  

      if(result instanceof Error) {
        result.message.includes('Usuário') ?
          response.status(401).json({message: result.message}):
          response.status(404).json({message: result.message});
      }

      return response.status(204).end();
    } catch(err) {
      return response.status(404).json({"message": "Post não existe"});
    }
  }
}