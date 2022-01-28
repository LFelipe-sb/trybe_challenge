import { body } from 'express-validator';

export const postValidate = [
  body('title').exists().withMessage('"title" is required'),
  body('content').exists().withMessage('"content" is required'),
];
