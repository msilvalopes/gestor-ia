const request = require('supertest');
const app = require('../server');

describe('Task Update Validation', () => {
  beforeEach(async () => {
    // Limpar dados antes de cada teste
    await require('../models/Task').deleteMany({});
  });

  it('should return 400 if title is missing during update', async () => {
    const task = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });

    const response = await request(app)
      .put(`/tasks/${task.body._id}`)
      .send({ description: 'Updated Description' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('title is required');
  });

  it('should return 400 if title is empty during update', async () => {
    const task = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });

    const response = await request(app)
      .put(`/tasks/${task.body._id}`)
      .send({ title: '', description: 'Updated Description' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('title is required');
  });

  it('should return 400 if description is missing during update', async () => {
    const task = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });

    const response = await request(app)
      .put(`/tasks/${task.body._id}`)
      .send({ title: 'Updated Title' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('description is required');
  });

  it('should return 400 if description is empty during update', async () => {
    const task = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });

    const response = await request(app)
      .put(`/tasks/${task.body._id}`)
      .send({ title: 'Updated Title', description: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('description is required');
  });

  it('should return 400 if id is invalid during update', async () => {
    const response = await request(app)
      .put('/tasks/invalid-id')
      .send({ title: 'Updated Title', description: 'Updated Description' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid task ID');
  });

  it('should return 404 if task does not exist during update', async () => {
    const response = await request(app)
      .put('/tasks/507f1f77bcf86cd799439011')
      .send({ title: 'Updated Title', description: 'Updated Description' });

    expect(response.status).toBe(404);
    expect(response.body.message).toContain('Task not found');
  });

  it('should successfully update task with valid data', async () => {
    const task = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' });

    const response = await request(app)
      .put(`/tasks/${task.body._id}`)
      .send({ title: 'Updated Title', description: 'Updated Description' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
    expect(response.body.description).toBe('Updated Description');
  });
});