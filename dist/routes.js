"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var AccessLoginController_1 = require("./app/controllers/login/AccessLoginController");
var CreateUserController_1 = require("./app/controllers/users/CreateUserController");
var ListUserController_1 = require("./app/controllers/users/ListUserController");
var validateUsers_1 = require("./app/middlewares/validations/validateUsers");
var validatePost_1 = require("./app/middlewares/validations/validatePost");
var validateLogin_1 = require("./app/middlewares/validations/validateLogin");
var ensureAuthenticated_1 = require("./app/middlewares/authentication/ensureAuthenticated");
var DeleteUserController_1 = require("./app/controllers/users/DeleteUserController");
var CreatePostController_1 = require("./app/controllers/posts/CreatePostController");
var ListPostController_1 = require("./app/controllers/posts/ListPostController");
var UpdatePostController_1 = require("./app/controllers/posts/UpdatePostController");
var SearchPostController_1 = require("./app/controllers/posts/SearchPostController");
var DeletePostController_1 = require("./app/controllers/posts/DeletePostController");
exports.routes = (0, express_1.Router)();
exports.routes.post('/user', validateUsers_1.userValidate, new CreateUserController_1.CreateUserController().handle);
exports.routes.post('/login', validateLogin_1.loginValidate, new AccessLoginController_1.AccessLoginController().handle);
exports.routes.post('/post', ensureAuthenticated_1.ensureAuthenticated, validatePost_1.postValidate, new CreatePostController_1.CreatePostController().handle);
exports.routes.get('/post', ensureAuthenticated_1.ensureAuthenticated, new ListPostController_1.ListPostController().handle);
exports.routes.get('/post/search', ensureAuthenticated_1.ensureAuthenticated, new SearchPostController_1.SearchPostController().handle);
exports.routes.get('/post/:id', ensureAuthenticated_1.ensureAuthenticated, new ListPostController_1.ListPostController().handle);
exports.routes.get('/user', ensureAuthenticated_1.ensureAuthenticated, new ListUserController_1.ListUserController().handle);
exports.routes.get('/user/:id', ensureAuthenticated_1.ensureAuthenticated, new ListUserController_1.ListUserController().handle);
exports.routes.put('/post/:id', ensureAuthenticated_1.ensureAuthenticated, validatePost_1.postValidate, new UpdatePostController_1.UpdatePostController().handle);
exports.routes.delete('/user/me', ensureAuthenticated_1.ensureAuthenticated, new DeleteUserController_1.DeleteUserController().handle);
exports.routes.delete('/post/:id', ensureAuthenticated_1.ensureAuthenticated, new DeletePostController_1.DeletePostController().handle);
