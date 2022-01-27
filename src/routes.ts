import { Router } from 'express';
import { accessLoginController } from './app/controllers/login/accessLoginController';
import { CreateUserController } from './app/controllers/users/CreateUserController';
import { ListUserController } from './app/controllers/users/ListUserController';

import { userValidate } from './app/middlewares/validations/validateUsers';
import { loginValidate } from './app/middlewares/validations/validateLogin';
import { ensureAuthenticated } from './app/middlewares/authentication/ensureAuthenticated';

export const routes = Router();

routes.post('/user', userValidate, new CreateUserController().handle);
routes.post('/login', loginValidate, new accessLoginController().handle);
routes.get('/user', ensureAuthenticated , new ListUserController().handle);