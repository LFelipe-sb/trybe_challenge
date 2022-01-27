import { Router } from 'express';
import { CreateUserController } from './app/controllers/users/CreateUserController';
import { ListUserController } from './app/controllers/users/ListUserController';

import { userValidate } from './app/middlewares/validations/validateUsers';

export const routes = Router();

routes.post('/user', userValidate, new CreateUserController().handle);
routes.get('/user', new ListUserController().handle);