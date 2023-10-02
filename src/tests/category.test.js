const app = require('../app');
const request = require('supertest');

let token;
let id;

beforeAll(async () => {
  const body = {
    email: 'test@gmail.com',
    password: 'test1234'
  }
  const res = await request(app).post('/users/login').send(body);
  token = res.body.token;
});


test('GET /categories', async () => {
  const res = await request(app).get('/categories');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


test('POST /categories', async () => {
  const body = { name: "Politics" }
  const res = await request(app)
    .post('/categories')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
  expect(res.body.id).toBeDefined();
});

test('DELETE /categories/:id', async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});