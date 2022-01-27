import { body } from 'express-validator';

export const loginValidate = [
  body('email').exists().withMessage('"email" is required'),
  body('email').notEmpty().withMessage('"email" is not allowed to be empty'),
  body('email').isEmail().withMessage('"email" must be a valid email'),
  body('password').exists().withMessage('"password" is required'),
  body('password').notEmpty().withMessage('"password" is not allowed to be empty'),
];
