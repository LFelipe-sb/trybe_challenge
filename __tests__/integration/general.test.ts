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
  incorrectUserId,
} from '../mock';

let tokenJWT: string;
let correctUserId: string;

describe('Validation endpoints', () => {

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
    tokenJWT = response.body.token;
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

  it('LIST USER - should be return statusCode 200 and list user if tokenJWT is valid', async () => {
    const response = await request(app).get('/user').send() 
      .set('Authorization', tokenJWT);
    expect(response.statusCode).toBe(200);
    response.body.forEach((item: any) => {
      correctUserId = item.id;
      expect(item).toHaveProperty('displayName');
      expect(item).toHaveProperty('email');
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('image');
      expect(item).not.toHaveProperty('password');
    });
  });

  it('LIST USER - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).get('/user').send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('LIST USER - should be return statusCode 401 if tokenJWT is invalid', async () => {
    const response = await request(app).get('/user').send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  it('LIST SPECIFIC USER - should be return statusCode 200 and a specific user if tokenJWT is valid', async () => {
    const response = await request(app).get(`/user/${correctUserId}`).send()
      .set('Authorization', tokenJWT);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('displayName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('image');
    expect(response.body).not.toHaveProperty('password');
  });

  it('LIST SPECIFIC USER - should be return statusCode 404 if not found specific user and tokenJWT is valid', async () => {
    const response = await request(app).get(`/user/${incorrectUserId}`).send()
    .set('Authorization', tokenJWT);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('Usuário não existe');
  });

  it('LIST SPECIFIC USER - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).get(`/user/${correctUserId}`).send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('LIST SPECIFIC USER - should be return statusCode 401 if tokenJWT is invalid', async () => {
    const response = await request(app).get(`/user/${correctUserId}`).send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  it('DELETE USER - should be return statusCode 204 if user was delete sucessfully', async () => {
    const response = await request(app).delete('/user/me').send()
      .set('Authorization', tokenJWT);
    expect(response.statusCode).toBe(204);
  });

  it('DELETE USER - should be return statusCode 204 if user was delete sucessfully', async () => {
    const response = await request(app).del('/user/me').send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('DELETE USER - should be return statusCode 204 if user was delete sucessfully', async () => {
    const response = await request(app).del('/user/me').send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  afterAll(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    };    
  });
});