import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UpdatePostService } from "../../services/posts/UpdatePostService";

export class UpdatePostController { 
  async handle(request: Request, response: Response) {
    
    const errors = validationResult(request);
    
    if (!errors.isEmpty()){
      const error = errors.array()[0];
      return response.status(400).send({message: error.msg})
    }

    const {id} = request.params;
    const {title, content} = request.body;

    const service = new UpdatePostService();
    const result: any = await service.execute({id, title, content});

    if(request.id !== result.userId) {
      return response.status(401).json({message: 'Usuário não autorizado'});
    }

    delete result.id;
    delete result.updated;
    delete result.published;

    return response.status(200).json(result);
  }
}
