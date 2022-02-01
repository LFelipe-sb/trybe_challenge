"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    var authToken = request.headers.authorization;
    if (!authToken)
        return response.status(401).json({ message: 'Token não encontrado' });
    var token = authToken.replace('Bearer', '').trim();
    try {
        var secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
        var user = (0, jsonwebtoken_1.verify)(token, secret).user;
        request.id = user.id;
        return next();
    }
    catch (err) {
        return response.status(401).json({ message: 'Token expirado ou inválido' });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
