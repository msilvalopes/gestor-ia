const request = require('supertest');
const app = require('../server');

describe('POST /tasks', () => {
  beforeEach(() => {
    // Limpar dados antes de cada teste
    // Aqui poderia limpar o banco de dados se estivesse usando um
  });

  test('should create a new task with valid data', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      completed: false
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(201);

    expect(response.body).toHaveProperty('title', taskData.title);
    expect(response.body).toHaveProperty('description', taskData.description);
    expect(response.body).toHaveProperty('completed', taskData.completed);
    expect(response.body).toHaveProperty('_id');
  });

  test('should return 400 error when title is missing', async () => {
    const taskData = {
      description: 'This is a test task',
      completed: false
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 error when title is empty string', async () => {
    const taskData = {
      title: '',
      description: 'This is a test task',
      completed: false
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 error when description is missing', async () => {
    const taskData = {
      title: 'Test Task',
      completed: false
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 error when completed is not a boolean', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      completed: 'not-a-boolean'
    };

    const response = await request(app)
      .post('/tasks')
      .send(taskData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 error when task data is empty', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});