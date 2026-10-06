const request = require('supertest');
const app = require('../server');

describe('Pagination Middleware', () => {
  test('should return 400 for invalid page parameter', async () => {
    const response = await request(app)
      .get('/tasks?page=0&limit=10')
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 for invalid limit parameter', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=0')
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 for limit greater than 100', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=150')
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should set pagination parameters correctly', async () => {
    const response = await request(app)
      .get('/tasks?page=2&limit=5')
      .expect(200);

    // Verifica se a resposta contém os dados esperados
    expect(response.body).toHaveProperty('data');
  });
});