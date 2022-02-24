//import request from 'supertest';
//import { getServer } from '../app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  //describe('[GET] /users', () => {
  //it('response statusCode 200 / findAll', () => {
  //const findUser: User[] = userModel;
  //const usersRoute = new UserRoute();
  //return request(getServer()).get(`${usersRoute.path}`).expect(200, { data: findUser, message: 'findAll' });
  //});
  //});
  //describe('[GET] /users/:id', () => {
  //it('response statusCode 200 / findOne', () => {
  //const userId = 1;
  //const findUser: User = userModel.find(user => user.id === userId);
  //const usersRoute = new UserRoute();
  //return request(getServer()).get(`${usersRoute.path}/${userId}`).expect(200, { data: findUser, message: 'findOne' });
  //});
  //});
  //describe('[POST] /users', () => {
  //it('response statusCode 201 / created', async () => {
  //const userData: CreateUserDto = {
  //email: 'example@email.com',
  //password: 'password',
  //};
  //const usersRoute = new UserRoute();
  //return request(getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
  //});
  //});
  //describe('[PUT] /users/:id', () => {
  //it('response statusCode 200 / updated', async () => {
  //const userId = 1;
  //const userData: CreateUserDto = {
  //email: 'example@email.com',
  //password: 'password',
  //};
  //const usersRoute = new UserRoute();
  //return request(getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
  //});
  //});
  //describe('[DELETE] /users/:id', () => {
  //it('response statusCode 200 / deleted', () => {
  //const userId = 1;
  //const deleteUser: User[] = userModel.filter(user => user.id !== userId);
  //const usersRoute = new UserRoute();
  //return request(getServer()).delete(`${usersRoute.path}/${userId}`).expect(200, { data: deleteUser, message: 'deleted' });
  //});
  //});
});

describe('Testing Auth', () => {
  //describe('[POST] /signup', () => {
  //it('response should have the Create userData', () => {
  //const userData: CreateUserDto = {
  //email: 'example@email.com',
  //password: 'password',
  //};
  //const authRoute = new AuthRoute();
  //return request(getServer()).post('/signup').send(userData);
  //});
  //});
  //describe('[POST] /login', () => {
  //it('response should have the Set-Cookie header with the Authorization token', async () => {
  //const userData: CreateUserDto = {
  //email: 'example1@email.com',
  //password: 'password',
  //};
  //const authRoute = new AuthRoute();
  //return request(getServer())
  //.post('/login')
  //.send(userData)
  //.expect('Set-Cookie', /^Authorization=.+/);
  //});
  //});
  // error: StatusCode : 404, Message : Authentication token missing
  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', () => {
  //     const authRoute = new AuthRoute();
  //     const app = new App([authRoute]);
  //     return request(getServer())
  //       .post('/logout')
  //       .expect('Set-Cookie', /^Authorization=\;/);
  //   });
  // });
});
