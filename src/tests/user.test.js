const request = require('supertest')
const app = require('../app')

let id;
let token;

test('POST /users', async() =>{
    const body = {
        firstName: 'martin',
        lastName: 'colum',
        email: 'hmmartincolum@gmail.com',
        password: 'martin123123',
        phone: '2966442231'
    }
    const res = await request(app).post('/users')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.password).toBeFalsy();

})


test('POST /users/login', async () => {
    const body = {
        email: 'hmmartincolum@gmail.com',
        password: 'martin123123',
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
});

test('GET /users', async() =>{
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
     expect(res.status).toBe(200);
     expect(res.body).toBeInstanceOf(Array)
})


test('PUT /users/:id', async () => {
    const body = {
        firstName: 'Marce Martin Colum'
    }
    const res = await request(app).put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login con contraseñas invalidas debe retornar error', async () => {
    const body={
        email: 'hmmartincolum@invalid.com',
        password: '00000000',
    }
   
    const res = await request(app).post('/users/login').send(body);
    console.log(res.body)
    expect(res.status).toBe(401);
 
});

test('DELETE /users/:id', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
