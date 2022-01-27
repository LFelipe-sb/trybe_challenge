import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ListUserService } from '../../services/login/accessLoginService';
import { generatedJWT } from '../../helpers/jwtGeneretedToken';

export class accessLoginController {
  async handle(request: Request, response: Response) {

    const errors = validationResult(request);
    
    if (!errors.isEmpty()){
      const error = errors.array()[0];
      return response.status(400).send({message: error.msg})
    }

    const service = new ListUserService();

    const {email, password} = request.body;
    const result = await service.execute(email, password);

    if(!result) {
      return response.status(400).json({message: "Campos inválidos" });
    }

    const token = generatedJWT({
      id: result.id,
      displayName: result.displayName,
      email,
    });
    
    return response.status(200).json({token});
  }
}