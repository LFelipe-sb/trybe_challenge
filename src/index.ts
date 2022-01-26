import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import './database/connect';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running'));
