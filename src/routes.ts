import { Router } from 'express';
import { AccessLoginController } from './app/controllers/login/AccessLoginController';
import { CreateUserController } from './app/controllers/users/CreateUserController';
import { ListUserController } from './app/controllers/users/ListUserController';

import { userValidate } from './app/middlewares/validations/validateUsers';
import { postValidate } from './app/middlewares/validations/validatePost';
import { loginValidate } from './app/middlewares/validations/validateLogin';
import { ensureAuthenticated } from './app/middlewares/authentication/ensureAuthenticated';
import { DeleteUserController } from './app/controllers/users/DeleteUserController';
import { CreatePostController } from './app/controllers/posts/CreatePostController';
import { ListPostController } from './app/controllers/posts/ListPostController';
import { UpdatePostController } from './app/controllers/posts/UpdatePostController';
import { SearchPostController } from './app/controllers/posts/SearchPostController';
import { DeletePostController } from './app/controllers/posts/DeletePostController';

export const routes = Router();

routes.post('/user', userValidate, new CreateUserController().handle);
routes.post('/login', loginValidate, new AccessLoginController().handle);
routes.post('/post', ensureAuthenticated, postValidate, new CreatePostController().handle);
routes.get('/post', ensureAuthenticated, new ListPostController().handle);
routes.get('/post/search', ensureAuthenticated, new SearchPostController().handle);
routes.get('/post/:id', ensureAuthenticated, new ListPostController().handle);
routes.get('/user', ensureAuthenticated, new ListUserController().handle);
routes.get('/user/:id', ensureAuthenticated, new ListUserController().handle);
routes.put('/post/:id', ensureAuthenticated, postValidate, new UpdatePostController().handle);
routes.delete('/user/me', ensureAuthenticated, new DeleteUserController().handle);
routes.delete('/post/:id', ensureAuthenticated, new DeletePostController().handle);