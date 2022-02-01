"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = void 0;
var express_validator_1 = require("express-validator");
exports.loginValidate = [
    (0, express_validator_1.body)('email').exists().withMessage('"email" is required'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('"email" is not allowed to be empty'),
    (0, express_validator_1.body)('email').isEmail().withMessage('"email" must be a valid email'),
    (0, express_validator_1.body)('password').exists().withMessage('"password" is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('"password" is not allowed to be empty'),
];
