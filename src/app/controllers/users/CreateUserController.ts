import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateUserService } from '../../services/users/CreateUserService';
import { generatedJWT } from '../../helpers/JwtGeneretedToken';

export class CreateUserController {
  async handle(request: Request, response: Response) {

    const errors = validationResult(request);
    
    if (!errors.isEmpty()){
      const error = errors.array()[0];
      return response.status(400).send({message: error.msg})
    }

    const service = new CreateUserService();

    const {displayName, email, password, image} = request.body;
    const result = await service.execute({displayName, email, password, image});

    if(result instanceof Error) {
      return response.status(409).json({message: result.message});
    }

    const token = generatedJWT(displayName, email);

    return response.status(201).json({token});
  }
}