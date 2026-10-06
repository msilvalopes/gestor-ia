const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

// Mock do modelo Task
jest.mock('../models/Task');

describe('GET /tasks/:id', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar tarefa específica quando o ID existir', async () => {
    const mockTask = {
      _id: '1234567890abcdef12345678',
      title: 'Tarefa de teste',
      description: 'Descrição da tarefa de teste',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    Task.findById.mockResolvedValue(mockTask);

    const response = await request(app)
      .get('/tasks/1234567890abcdef12345678')
      .expect(200);

    expect(response.body).toEqual(mockTask);
  });

  test('deve retornar erro 404 quando o ID não existir', async () => {
    Task.findById.mockResolvedValue(null);

    const response = await request(app)
      .get('/tasks/1234567890abcdef12345678')
      .expect(404);

    expect(response.body).toEqual({ message: 'Tarefa não encontrada' });
  });

  test('deve retornar erro 400 quando o ID for inválido', async () => {
    const response = await request(app)
      .get('/tasks/invalid-id')
      .expect(400);

    expect(response.body).toEqual({ message: 'ID inválido' });
  });
});