"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generatedJWT(user) {
    var secret = process.env.JWTSECRET || 'LuisFelipeTrybe@';
    return jsonwebtoken_1.default.sign({ user: user }, secret, { expiresIn: 60 * 60 * 5 });
}
exports.generatedJWT = generatedJWT;
