import request from 'supertest';
import { app } from '../../src/app';
import { createConnection, getConnection } from 'typeorm';

import { 
  inputCreateUser, 
  displayLess8,
  emailInvalid,
  emailWithName,
  emailRequired,
  passwordLess6,
  passwordRequired,
  userNotExist,
  passwordEmpty,
  emailEmpty,
  inputAuthenticate,
} from '../mock';

describe('USER - POST: /user', () => {

  beforeAll( async () => {
    const connection = await createConnection();
  });

  it('CREATE USER - should be able to create a new user', async () => {
    const response = await request(app).post('/user').send(inputCreateUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('CREATE USER - should be return statusCode 400 When "displayName" less then 8 characters', async () => {
    const response = await request(app).post('/user').send(displayLess8);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"displayName" length must be at least 8 characters long');
  });

  it('CREATE USER - should be return statusCode 400 When "email" is invalid', async () => {
    const response = await request(app).post('/user').send(emailInvalid);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"email" must be a valid email');
  });

  it('CREATE USER - should be return statusCode 400 When "email" is like @gmail.com', async () => {
    const response = await request(app).post('/user').send(emailWithName);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"email" must be a valid email');
  });

  it('CREATE USER - should be return statusCode 400 When "email" not send', async () => {
    const response = await request(app).post('/user').send(emailRequired);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"email" is required');
  });

  it('CREATE USER - should be return statusCode 400 When "password" less then 6 characters', async () => {
    const response = await request(app).post('/user').send(passwordLess6);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"password" length must be 6 characters long');
  });

  it('CREATE USER - should be return statusCode 400 When "password" not send', async () => {
    const response = await request(app).post('/user').send(passwordRequired);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"password" is required');
  });

  it('CREATE USER - should be return statusCode 409 When "email" already exists at database', async () => {
    const response = await request(app).post('/user').send(inputCreateUser);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toEqual('Usuário já existe');
  });

  it('LOGIN AUTHENTICATE - should be able to login application', async () => {
    const response = await request(app).post('/login').send(inputAuthenticate);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('LOGIN AUTHENTICATE - should be return statusCode 400 When "email" is empty', async () => {
    const response = await request(app).post('/login').send(emailEmpty);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"email" is not allowed to be empty');
  });

  it('LOGIN AUTHENTICATE - should be return statusCode 400 When "email" not send', async () => {
    const response = await request(app).post('/login').send(emailRequired);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"email" is required');
  });

  it('LOGIN AUTHENTICATE - should be return statusCode 400 When "password" is empty', async () => {
    const response = await request(app).post('/login').send(passwordEmpty);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"password" is not allowed to be empty');
  });

  it('LOGIN AUTHENTICATE - should be return statusCode 400 When "password" not send', async () => {
    const response = await request(app).post('/login').send(passwordRequired);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"password" is required');
  });

  it('LOGIN AUTHENTICATE - should be return statusCode 400 When user not exists at database', async () => {
    const response = await request(app).post('/login').send(userNotExist);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Campos inválidos');
  });

  afterAll(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    };    
  });
});