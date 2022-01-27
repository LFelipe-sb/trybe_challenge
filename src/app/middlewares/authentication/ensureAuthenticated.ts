import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) 
    return response.status(401).json({error: 'Token.invalid'});

  const [_type, token] = authToken.split(' ');

  try {

    const secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
    const { sub } = verify(token, secret) as IPayload;
    request.userId = sub;
    
    return next();

  } catch(err) {
    return response.status(401).json({error: 'token.expired'});
  }
}