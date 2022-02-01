"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var connect_1 = __importDefault(require("./database/connect"));
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
require("reflect-metadata");
require("./database/connect");
(0, connect_1.default)().then(function () { return console.log('connected with database'); });
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(routes_1.routes);
