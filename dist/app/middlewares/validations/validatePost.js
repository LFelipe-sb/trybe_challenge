"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidate = void 0;
var express_validator_1 = require("express-validator");
exports.postValidate = [
    (0, express_validator_1.body)('title').exists().withMessage('"title" is required'),
    (0, express_validator_1.body)('content').exists().withMessage('"content" is required'),
];
