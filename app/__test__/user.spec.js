const supertest = require('supertest');
const app = require('../app.js');
const sql = require('../models/db.js');

beforeAll(done => {
    done()
  })
  
afterAll( done => {
// Closing the DB connection allows Jest to exit successfully.
    sql.end()
    done()
})

describe("Testing the API", () => {

    it('It should response the get / method', async done => {
        const response = await supertest(app).get('/')
        expect(response.statusCode).toBe(200);
        done();
    });
})

describe("Testing the users API", () => {

    it('It should response the get /user/:id method', async done => {
        const response = await supertest(app).get('/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.idUser).toBe(1);
        done();
    });

    it('It should save user to the database with post /user method', async done => {

        const user = {
            username: 'testUser1',
            pass: '123123123',
            firstName: 'Test',
            lastName: 'User 1',
            email: 'testuser1@testuser.com',
        }

        const responsePostUser = await supertest(app).post('/users').send(user);
        const responseGetUserByUsername = await supertest(app).get(`/users/username/${user.username}`)

        expect(responsePostUser.statusCode).toBe(200);
        expect(responseGetUserByUsername.statusCode).toBe(200);
        expect(responseGetUserByUsername.body.username).toBe(user.username);
        done();
    });
});