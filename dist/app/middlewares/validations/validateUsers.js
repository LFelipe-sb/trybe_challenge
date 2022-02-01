"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidate = void 0;
var express_validator_1 = require("express-validator");
exports.userValidate = [
    (0, express_validator_1.body)('displayName').isLength({ min: 8 }).withMessage('"displayName" length must be at least 8 characters long'),
    (0, express_validator_1.body)('email').notEmpty().withMessage('"email" is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('"email" must be a valid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('"password" is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('"password" length must be 6 characters long'),
];
