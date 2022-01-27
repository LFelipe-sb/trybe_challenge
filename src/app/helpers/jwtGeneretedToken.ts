import jwt from 'jsonwebtoken';

interface IToken {
  id: string,
  displayName: string,
  email: string,
}

export function generatedJWT(user: IToken){
  const secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
  return jwt.sign({user}, secret, {expiresIn:60*60*5});
}
