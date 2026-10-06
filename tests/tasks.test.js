const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

// Mock do modelo Task
jest.mock('../models/Task');

describe('GET /tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar todas as tarefas com sucesso', async () => {
    const mockTasks = [
      { id: 1, title: 'Tarefa 1', description: 'Descrição 1', completed: false },
      { id: 2, title: 'Tarefa 2', description: 'Descrição 2', completed: true }
    ];

    Task.find.mockResolvedValue(mockTasks);

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
    expect(Task.find).toHaveBeenCalledTimes(1);
  });

  test('deve retornar erro interno do servidor quando ocorrer falha no banco de dados', async () => {
    Task.find.mockRejectedValue(new Error('Erro no banco de dados'));

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Erro no servidor');
  });

  test('deve retornar array vazio quando não houver tarefas', async () => {
    Task.find.mockResolvedValue([]);

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});