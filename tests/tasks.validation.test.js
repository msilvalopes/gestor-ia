const request = require('supertest');
const app = require('../server');

describe('POST /api/tasks', () => {
  describe('Validação de dados', () => {
    test('Deve retornar erro 400 se o título for vazio', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: '',
          description: 'Descrição da tarefa',
          completed: false
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve retornar erro 400 se o título for nulo', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: null,
          description: 'Descrição da tarefa',
          completed: false
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve retornar erro 400 se o título for undefined', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          description: 'Descrição da tarefa',
          completed: false
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve retornar erro 400 se a descrição for nula', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Título da tarefa',
          description: null,
          completed: false
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve retornar erro 400 se o campo completed não for booleano', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Título da tarefa',
          description: 'Descrição da tarefa',
          completed: 'true'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('Deve criar uma tarefa com dados válidos', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Título da tarefa',
          description: 'Descrição da tarefa',
          completed: false
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Título da tarefa');
      expect(response.body).toHaveProperty('description', 'Descrição da tarefa');
      expect(response.body).toHaveProperty('completed', false);
    });
  });
});