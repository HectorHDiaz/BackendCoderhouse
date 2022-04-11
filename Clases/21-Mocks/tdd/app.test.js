// GET => / => code: 200, body: 'Hello Everyone' 

const request = require('supertest');
const app = require('./app');

describe("Express app test", () => {
  test('Should respond with 200 and "Hello Everyone"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe({
      name: "Calculadora",
      price: 200
    });
  });
});