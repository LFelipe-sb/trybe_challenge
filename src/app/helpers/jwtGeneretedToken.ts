import jwt from 'jsonwebtoken';

export function generatedJWT(displayName: string, email: string){
    const secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
    return jwt.sign({displayName, email}, secret, {expiresIn:60*60*5});
}
