import createConnection from './database/connect';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import apiDoc from './swagger.json';
import { routes } from './routes';
import cors from 'cors';
import 'reflect-metadata';
import './database/connect';

createConnection().then(() => console.log('connected with database'));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDoc));
app.use(routes);

app.get('/', (req, res) => {
  res.send({
      message: 'Boas vindas ao Trybe Challenge - API de Blogs ❤',
      documentation: 'https://desafio-trybe.herokuapp.com/docs' 
  });
});

export {app};