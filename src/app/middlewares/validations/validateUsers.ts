import { body } from 'express-validator';

export const userValidate = [
  body('displayName').isLength({min: 8}).withMessage('"displayname" length must be at least 8 characters long'),
  body('email').notEmpty().withMessage('"email" is required'),
  body('email').isEmail().withMessage('"email" must be a valid email'),
  body('password').notEmpty().withMessage('"password" is required'),
  body('password').isLength({min: 6}).withMessage('"password" length must be 6 characters long'),
];

