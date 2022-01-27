import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) 
    return response.status(401).json({error: 'Token não encontrado'});

  const [_type, jwt] = authToken.split(' ');

  let token;

  authToken.includes('Bearer') ? token = jwt : token = authToken;

  try {

    const secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
    const { sub } = verify(token, secret) as IPayload;
    request.userId = sub;
    
    return next();

  } catch(err) {
    return response.status(401).json({error: 'Token expiredo ou inválido'});
  }
}