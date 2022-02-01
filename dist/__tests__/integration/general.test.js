"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../../src/app");
var typeorm_1 = require("typeorm");
var mock_1 = require("../mock");
var tokenUser1JWT;
var tokenUser2JWT;
var correctUserId;
var correctPostId;
describe('Validation endpoints', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, typeorm_1.createConnection)()];
                case 1:
                    connection = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be able to create a new user 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.inputCreateUser)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(201);
                    expect(response.body).toHaveProperty('token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be able to create a new user 2', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.inputCreateUser2)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(201);
                    expect(response.body).toHaveProperty('token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 400 When "displayName" less then 8 characters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.displayLess8)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"displayName" length must be at least 8 characters long');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 400 When "email" is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.emailInvalid)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"email" must be a valid email');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 400 When "email" is like @gmail.com', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.emailWithName)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"email" must be a valid email');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 400 When "email" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.emailRequired)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"email" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 400 When "password" less then 6 characters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.passwordLess6)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"password" length must be 6 characters long');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 400 When "password" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.passwordRequired)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"password" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE USER - should be return statusCode 409 When "email" already exists at database', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/user').send(mock_1.inputCreateUser)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(409);
                    expect(response.body.message).toEqual('Usuário já existe');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be able to login application', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.inputAuthenticate)];
                case 1:
                    response = _a.sent();
                    tokenUser1JWT = response.body.token;
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be able to login application', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.inputAuthenticate2)];
                case 1:
                    response = _a.sent();
                    tokenUser2JWT = response.body.token;
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be return statusCode 400 When "email" is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.emailEmpty)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"email" is not allowed to be empty');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be return statusCode 400 When "email" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.emailRequired)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"email" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be return statusCode 400 When "password" is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.passwordEmpty)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"password" is not allowed to be empty');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be return statusCode 400 When "password" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.passwordRequired)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"password" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LOGIN AUTHENTICATE - should be return statusCode 400 When user not exists at database', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/login').send(mock_1.userNotExist)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('Campos inválidos');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST USER - should be return statusCode 200 and list user if tokenJWT is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/user').send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    response.body.forEach(function (item) {
                        correctUserId = item.id;
                        expect(item).toHaveProperty('displayName');
                        expect(item).toHaveProperty('email');
                        expect(item).toHaveProperty('id');
                        expect(item).toHaveProperty('image');
                        expect(item).not.toHaveProperty('password');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST USER - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/user').send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST USER - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/user').send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC USER - should be return statusCode 200 and a specific user if tokenJWT is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/user/".concat(correctUserId)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('displayName');
                    expect(response.body).toHaveProperty('email');
                    expect(response.body).toHaveProperty('id');
                    expect(response.body).toHaveProperty('image');
                    expect(response.body).not.toHaveProperty('password');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC USER - should be return statusCode 404 if not found specific user and tokenJWT is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/user/".concat(mock_1.incorrectUserId)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(404);
                    expect(response.body.message).toEqual('Usuário não existe');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC USER - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/user/".concat(correctUserId)).send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC USER - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/user/".concat(correctUserId)).send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE POST - should be return statusCode 201 and create a post', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/post').send(mock_1.inputCreatePost)
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(201);
                    expect(response.body).toHaveProperty('content');
                    expect(response.body).toHaveProperty('title');
                    expect(response.body).toHaveProperty('userId');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE POST - should be return statusCode 400 When "title" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/post').send(mock_1.createPostWithOutTitle)
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"title" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE POST - should be return statusCode 400 When "content" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post('/post').send(mock_1.createPostWithOutContent)
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"content" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE POST - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/user').send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('CREATE POST - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/user').send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST POST - should be return statusCode 200 and list user if tokenJWT is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/post').send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    response.body.forEach(function (item) {
                        correctPostId = item.id;
                        expect(item).toHaveProperty('id');
                        expect(item).toHaveProperty('title');
                        expect(item).toHaveProperty('content');
                        expect(item).toHaveProperty('updated');
                        expect(item).toHaveProperty('published');
                        expect(item.user).toHaveProperty('id');
                        expect(item.user).toHaveProperty('displayName');
                        expect(item.user).toHaveProperty('email');
                        expect(item.user).toHaveProperty('image');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST POST - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/post').send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST POST - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get('/post').send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC POST - should be return statusCode 200 and a specific post if tokenJWT is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/".concat(correctPostId)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.body[0]).toHaveProperty('id');
                    expect(response.body[0]).toHaveProperty('title');
                    expect(response.body[0]).toHaveProperty('content');
                    expect(response.body[0]).toHaveProperty('updated');
                    expect(response.body[0]).toHaveProperty('published');
                    expect(response.body[0].user).toHaveProperty('id');
                    expect(response.body[0].user).toHaveProperty('displayName');
                    expect(response.body[0].user).toHaveProperty('email');
                    expect(response.body[0].user).toHaveProperty('image');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC POST - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/".concat(correctPostId)).send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC POST - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/".concat(correctPostId)).send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('LIST SPECIFIC POST - should be return statusCode 404 if not found specific post and tokenJWT is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/".concat(mock_1.incorrectPostId)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(404);
                    expect(response.body.message).toEqual('Post não existe');
                    return [2 /*return*/];
            }
        });
    }); });
    it('UPDATE POST - should be return statusCode 200 if update sucessfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/post/".concat(correctPostId)).send(mock_1.updatePost)
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveProperty('content');
                    expect(response.body).toHaveProperty('title');
                    expect(response.body).toHaveProperty('userId');
                    return [2 /*return*/];
            }
        });
    }); });
    it('UPDATE POST - should be return statusCode 401 if the user is not the owner of the post', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/post/".concat(correctPostId)).send(mock_1.updatePost)
                        .set('Authorization', tokenUser2JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Usuário não autorizado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('UPDATE POST - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/post/".concat(correctPostId)).send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('UPDATE POST - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/post/".concat(correctPostId)).send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('UPDATE POST - should be return statusCode 400 When "title" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/post/".concat(correctPostId)).send(mock_1.createPostWithOutTitle)
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"title" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('UPDATE POST - should be return statusCode 400 When "content" not send', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).put("/post/".concat(correctPostId)).send(mock_1.createPostWithOutContent)
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(400);
                    expect(response.body.message).toEqual('"content" is required');
                    return [2 /*return*/];
            }
        });
    }); });
    it('SEARCH POST - should be return statusCode 200 When search find the parameters on "title"', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/search?q=".concat(mock_1.searchTitle)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    if (response.body.length > 1) {
                        response.body.forEach(function (item) {
                            correctPostId = item.id;
                            expect(item).toHaveProperty('id');
                            expect(item).toHaveProperty('title');
                            expect(item).toHaveProperty('content');
                            expect(item).toHaveProperty('updated');
                            expect(item).toHaveProperty('published');
                            expect(item.user).toHaveProperty('id');
                            expect(item.user).toHaveProperty('displayName');
                            expect(item.user).toHaveProperty('email');
                            expect(item.user).toHaveProperty('image');
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('SEARCH POST - should be return statusCode 200 When search find the parameters on "content"', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/search?q=".concat(mock_1.searchContent)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    if (response.body.length > 1) {
                        response.body.forEach(function (item) {
                            correctPostId = item.id;
                            expect(item).toHaveProperty('id');
                            expect(item).toHaveProperty('title');
                            expect(item).toHaveProperty('content');
                            expect(item).toHaveProperty('updated');
                            expect(item).toHaveProperty('published');
                            expect(item.user).toHaveProperty('id');
                            expect(item.user).toHaveProperty('displayName');
                            expect(item.user).toHaveProperty('email');
                            expect(item.user).toHaveProperty('image');
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('SEARCH POST - should be return statusCode 200 When the parameters searched is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/search?q=").send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    if (response.body.length > 1) {
                        response.body.forEach(function (item) {
                            correctPostId = item.id;
                            expect(item).toHaveProperty('id');
                            expect(item).toHaveProperty('title');
                            expect(item).toHaveProperty('content');
                            expect(item).toHaveProperty('updated');
                            expect(item).toHaveProperty('published');
                            expect(item.user).toHaveProperty('id');
                            expect(item.user).toHaveProperty('displayName');
                            expect(item.user).toHaveProperty('email');
                            expect(item.user).toHaveProperty('image');
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('SEARCH POST - should be return statusCode 200 When not found blogpost and return a empty list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/search?q=dfdfge").send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('SEARCH POST - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/search?q=".concat(mock_1.searchContent)).send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('SEARCH POST - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/post/search?q=".concat(mock_1.searchContent)).send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE POST - should be return statusCode 204 if post was delete sucessfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).del("/post/".concat(correctPostId)).send()
                        .set('Authorization', tokenUser1JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(204);
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE POST - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).del("/post/".concat(correctPostId)).send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE POST - should be return statusCode 401 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).del("/post/".concat(correctPostId)).send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE USER - should be return statusCode 204 if user was delete sucessfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).del('/user/me').send()
                        .set('Authorization', tokenUser2JWT)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(204);
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE USER - should be return statusCode 401 if tokenJWT not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).del('/user/me').send()
                        .set('Authorization', '')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token não encontrado');
                    return [2 /*return*/];
            }
        });
    }); });
    it('DELETE USER - should be return statusCode 204 if tokenJWT is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).del('/user/me').send()
                        .set('Authorization', 'qwerty')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.body.message).toEqual('Token expirado ou inválido');
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var entities, _i, entities_1, entity, repository;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entities = (0, typeorm_1.getConnection)().entityMetadatas;
                    _i = 0, entities_1 = entities;
                    _a.label = 1;
                case 1:
                    if (!(_i < entities_1.length)) return [3 /*break*/, 4];
                    entity = entities_1[_i];
                    repository = (0, typeorm_1.getConnection)().getRepository(entity.name);
                    return [4 /*yield*/, repository.clear()];
                case 2:
                    _a.sent(); // Clear each entity table's content
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    }); });
});
