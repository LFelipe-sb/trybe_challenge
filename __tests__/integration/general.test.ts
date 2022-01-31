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
  inputCreatePost,
  inputCreateUser2,
  inputAuthenticate2,
  createPostWithOutTitle,
  createPostWithOutContent,
  incorrectPostId,
  updatePost,
  searchTerm,
} from '../mock';

let tokenUser1JWT: string;
let tokenUser2JWT: string;
let correctUserId: string;
let correctPostId: string;

describe('Validation endpoints', () => {

  beforeAll( async () => {
    const connection = await createConnection();
  });

  it('CREATE USER - should be able to create a new user 1', async () => {
    const response = await request(app).post('/user').send(inputCreateUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('CREATE USER - should be able to create a new user 2', async () => {
    const response = await request(app).post('/user').send(inputCreateUser2);
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
    tokenUser1JWT = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('LOGIN AUTHENTICATE - should be able to login application', async () => {
    const response = await request(app).post('/login').send(inputAuthenticate2);
    tokenUser2JWT = response.body.token;
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
      .set('Authorization', tokenUser1JWT);
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
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('displayName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('image');
    expect(response.body).not.toHaveProperty('password');
  });

  it('LIST SPECIFIC USER - should be return statusCode 404 if not found specific user and tokenJWT is valid', async () => {
    const response = await request(app).get(`/user/${incorrectUserId}`).send()
    .set('Authorization', tokenUser1JWT);
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

  it('CREATE POST - should be return statusCode 201 and create a post', async () => {
    const response = await request(app).post('/post').send(inputCreatePost)
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('userId');
  });

  it('CREATE POST - should be return statusCode 400 When "title" not send', async () => {
    const response = await request(app).post('/post').send(createPostWithOutTitle)
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"title" is required');
  });

  it('CREATE POST - should be return statusCode 400 When "content" not send', async () => {
    const response = await request(app).post('/post').send(createPostWithOutContent)
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"content" is required');
  });

  it('CREATE POST - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).get('/user').send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('CREATE POST - should be return statusCode 401 if tokenJWT is invalid', async () => {
    const response = await request(app).get('/user').send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  it('LIST POST - should be return statusCode 200 and list user if tokenJWT is valid', async () => {
    const response = await request(app).get('/post').send()
      .set('Authorization', tokenUser1JWT);
      expect(response.statusCode).toBe(200);
      response.body.forEach((item: any) => {
        correctPostId = item.id
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
  });

  it('LIST POST - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).get('/post').send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('LIST POST - should be return statusCode 401 if tokenJWT is invalid', async () => {
    const response = await request(app).get('/post').send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  it('LIST SPECIFIC POST - should be return statusCode 200 and a specific post if tokenJWT is valid', async () => {
    const response = await request(app).get(`/post/${correctPostId}`).send()
      .set('Authorization', tokenUser1JWT);
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
  });

  it('LIST SPECIFIC POST - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).get(`/post/${correctPostId}`).send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('LIST SPECIFIC POST - should be return statusCode 401 if tokenJWT is invalid', async () => {
    const response = await request(app).get(`/post/${correctPostId}`).send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  it('LIST SPECIFIC POST - should be return statusCode 404 if not found specific post and tokenJWT is valid', async () => {
    const response = await request(app).get(`/post/${incorrectPostId}`).send()
    .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('Post não existe');
  });

  it('UPDATE POST - should be return statusCode 200 if update sucessfully', async () => {
    const response = await request(app).put(`/post/${correctPostId}`).send(updatePost)
    .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('userId');
  });

  it('UPDATE POST - should be return statusCode 401 if the user is not the owner of the post', async () => {
    const response = await request(app).put(`/post/${correctPostId}`).send(updatePost)
    .set('Authorization', tokenUser2JWT);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Usuário não autorizado');
  });

  it('UPDATE POST - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).put(`/post/${correctPostId}`).send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('UPDATE POST - should be return statusCode 401 if tokenJWT is invalid', async () => {
    const response = await request(app).put(`/post/${correctPostId}`).send()
      .set('Authorization', 'qwerty');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token expirado ou inválido');
  });

  it('UPDATE POST - should be return statusCode 400 When "title" not send', async () => {
    const response = await request(app).put(`/post/${correctPostId}`).send(createPostWithOutTitle)
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"title" is required');
  });

  it('UPDATE POST - should be return statusCode 400 When "content" not send', async () => {
    const response = await request(app).put(`/post/${correctPostId}`).send(createPostWithOutContent)
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('"content" is required');
  });

  it('SEARCH POST - should be return statusCode 200 When search find the parameters', async () => {
    const response = await request(app).get(`/post/search?q=${searchTerm}`).send()
      .set('Authorization', tokenUser1JWT);
    expect(response.statusCode).toBe(200);
    response.body.forEach((item: any) => {
      correctPostId = item.id
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('content');
      expect(item).toHaveProperty('updated');
      expect(item).toHaveProperty('published');
    });
  });


  // it('DELETE POST - should be return statusCode 204 if post was delete sucessfully', async () => {
  //   const response = await request(app).del(`post/f2860752-615e-4427-afff-64460d794585
  //   `).send()
  //     .set('Authorization', tokenUser1JWT);
  //   expect(response.statusCode).toBe(204);
  // });

  // it('DELETE POST - should be return statusCode 401 if tokenJWT not exists', async () => {
  //   const response = await request(app).del(`post/${correctPostId}`).send()
  //     .set('Authorization', '');
  //   expect(response.statusCode).toBe(401);
  //   expect(response.body.message).toEqual('Token não encontrado');
  // });

  // it('DELETE POST - should be return statusCode 401 if tokenJWT is invalid', async () => {
  //   const response = await request(app).del(`post/${correctPostId}`).send()
  //     .set('Authorization', 'qwerty');
  //   expect(response.statusCode).toBe(401);
  //   expect(response.body.message).toEqual('Token expirado ou inválido');
  // });

  it('DELETE USER - should be return statusCode 204 if user was delete sucessfully', async () => {
    const response = await request(app).del('/user/me').send()
      .set('Authorization', tokenUser2JWT);
    expect(response.statusCode).toBe(204);
  });

  it('DELETE USER - should be return statusCode 401 if tokenJWT not exists', async () => {
    const response = await request(app).del('/user/me').send()
      .set('Authorization', '');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Token não encontrado');
  });

  it('DELETE USER - should be return statusCode 204 if tokenJWT is invalid', async () => {
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