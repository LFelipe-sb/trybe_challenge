import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import './database/connect';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running'));
