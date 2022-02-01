"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var connect_1 = __importDefault(require("./database/connect"));
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("./swagger.json"));
var routes_1 = require("./routes");
var cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
require("./database/connect");
(0, connect_1.default)().then(function () { return console.log('connected with database'); });
var app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.routes);
app.get('/', function (req, res) {
    res.send({
        message: 'Boas vindas ao Trybe Challenge - API de Blogs ❤',
        documentation: 'https://desafio-trybe.herokuapp.com/docs'
    });
});
