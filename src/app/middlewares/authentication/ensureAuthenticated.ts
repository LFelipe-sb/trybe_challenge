import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  user: any;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) 
    return response.status(401).json({error: 'Token não encontrado'});

  const token = authToken.replace('Bearer', '').trim();

  try {

    const secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
    const { user } = verify(token, secret) as IPayload;
    request.id = user.id;
    
    return next();

  } catch(err) {
    return response.status(401).json({error: 'Token expirado ou inválido'});
  }
}