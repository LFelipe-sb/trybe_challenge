import { Router } from 'express';
import { CreateUserController } from './app/controllers/users/CreateUserController';
import { ListUserController } from './app/controllers/users/ListuserController';

export const routes = Router();

routes.post('/user', new CreateUserController().handle);
routes.get('/user', new ListUserController().handle);