import createConnection from './database/connect';
import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import 'reflect-metadata';
import './database/connect';

createConnection().then(() => console.log('connected with database'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export {app};