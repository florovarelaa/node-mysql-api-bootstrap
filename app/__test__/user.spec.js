const supertest = require('supertest');
const app = require('../app.js');
const sql = require('../models/db.js');

let id_test_user;

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
        expect(response.body.id_user).toBe(1);
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

        //sets constant of testing user
        id_test_user = responsePostUser.body.id;

        expect(responsePostUser.statusCode).toBe(200);
        expect(responseGetUserByUsername.statusCode).toBe(200);
        expect(responseGetUserByUsername.body.username).toBe(user.username);
        done();
    });

    it('It should throw an error when sending and empty user to the database with post /user method', async done => {
        const emptyUser = {
            username: 'testUser1',
            pass: '123123123',
            firstName: 'Test',
            lastName: 'User 1',
            email: 'testuser1@testuser.com',
        };
        try {
            const responsePostEmptyUser = await supertest(app).post('/users').send(emptyUser);
        } catch (error) {
            expect(error).toThrow()
        }
        done();
    })

    it('It should response the get /users', async done => {
        const response = await supertest(app).get('/users');
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.statusCode).toBe(200);
        done();
    });

    it('It should response the get /users/:id_user method', async done => {
        const response = await supertest(app).get(`/users/${id_test_user}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id_user).toBe(id_test_user);
        done();
    });

    it('It should response the get /users/:username method', async done => {
        const response = await supertest(app).get('/users/username/testUser1');
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('testUser1');
        done();
    });

    it('It should update user in the database with put /user/:id_user method', async done => {
        const user = {
            firstname: 'UserUpdatedWithTest',
            lastname: 'UpdatedUserWithTest',
            email: 'updatedUser@withTest.com',
        }
        const responsePutUser = await supertest(app).put(`/users/${id_test_user}`).send(user);
        const responseGetUserById = await supertest(app).get(`/users/${id_test_user}`)
        expect(responsePutUser.statusCode).toBe(200);
        expect(responseGetUserById.statusCode).toBe(200);
        expect(responseGetUserById.body.firstname).toBe(user.firstname);
        done();
    });

    it('It should delete user in the database with delete /user/:id_user method', async done => {

        const responseDeleteUser = await supertest(app).del(`/users/${id_test_user}`);
        expect(responseDeleteUser.statusCode).toBe(200);
        done();
    });
});