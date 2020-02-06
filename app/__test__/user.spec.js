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

describe("Testing the users API", () => {

    it('It should response the get / method', async done => {
        const response = await supertest(app).get('/users/1')
        expect(response.statusCode).toBe(200);
        expect(response.body.idUser).toBe(1);
        done();
    });
});