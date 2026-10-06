const request = require('supertest');
const app = require('../server');

describe('GET /tasks/:id', () => {
  test('Deve retornar uma tarefa específica quando o ID existir', async () => {
    const response = await request(app).get('/tasks/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title', 'Tarefa 1');
  });

  test('Deve retornar 404 quando o ID não existir', async () => {
    const response = await request(app).get('/tasks/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Tarefa não encontrada');
  });

  test('Deve retornar 404 para IDs inválidos', async () => {
    const response = await request(app).get('/tasks/abc');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Tarefa não encontrada');
  });
});