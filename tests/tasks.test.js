const request = require('supertest');
const app = require('../server');

describe('GET /tasks', () => {
  test('Deve retornar todas as tarefas', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('completed');
  });

  test('Deve retornar status 200', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
  });
});