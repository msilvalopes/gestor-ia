const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

// Testes para paginação nas rotas de tarefas
describe('Tasks Pagination', () => {
  beforeEach(async () => {
    // Limpar a base de dados antes de cada teste
    await Task.deleteMany({});
    
    // Criar algumas tarefas para testar a paginação
    const tasks = [
      { title: 'Task 1', description: 'Description 1' },
      { title: 'Task 2', description: 'Description 2' },
      { title: 'Task 3', description: 'Description 3' },
      { title: 'Task 4', description: 'Description 4' },
      { title: 'Task 5', description: 'Description 5' }
    ];
    
    await Task.insertMany(tasks);
  });

  afterEach(async () => {
    // Limpar a base de dados após cada teste
    await Task.deleteMany({});
  });

  test('GET /tasks should return paginated tasks with default page size', async () => {
    const response = await request(app)
      .get('/tasks')
      .expect(200);
    
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.tasks).toHaveLength(5); // Deve retornar todas as tarefas
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(10); // Limite padrão
    expect(response.body.pagination.total).toBe(5);
  });

  test('GET /tasks should return paginated tasks with custom page and limit', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=2')
      .expect(200);
    
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.tasks).toHaveLength(2);
    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(2);
    expect(response.body.pagination.total).toBe(5);
  });

  test('GET /tasks should return paginated tasks with page 2', async () => {
    const response = await request(app)
      .get('/tasks?page=2&limit=2')
      .expect(200);
    
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.tasks).toHaveLength(2);
    expect(response.body.pagination.page).toBe(2);
    expect(response.body.pagination.limit).toBe(2);
    expect(response.body.pagination.total).toBe(5);
  });

  test('GET /tasks should return empty array when page exceeds total pages', async () => {
    const response = await request(app)
      .get('/tasks?page=10&limit=2')
      .expect(200);
    
    expect(response.body).toHaveProperty('tasks');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.tasks).toHaveLength(0);
    expect(response.body.pagination.page).toBe(10);
    expect(response.body.pagination.limit).toBe(2);
    expect(response.body.pagination.total).toBe(5);
  });

  test('GET /tasks should handle invalid page parameter', async () => {
    const response = await request(app)
      .get('/tasks?page=abc&limit=2')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });

  test('GET /tasks should handle invalid limit parameter', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=abc')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });

  test('GET /tasks should handle negative page parameter', async () => {
    const response = await request(app)
      .get('/tasks?page=-1&limit=2')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });

  test('GET /tasks should handle negative limit parameter', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=-2')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });

  test('GET /tasks should handle limit greater than maximum allowed', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=1000')
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
  });
});