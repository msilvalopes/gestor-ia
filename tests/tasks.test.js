const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

// Mock do modelo Task para evitar interação com o banco de dados
jest.mock('../models/Task');

describe('PUT /tasks/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should update a task with valid data', async () => {
    const mockTask = {
      id: '1',
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true,
    };

    Task.findByIdAndUpdate.mockResolvedValue(mockTask);

    const response = await request(app)
      .put('/tasks/1')
      .send({
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
      })
      .expect(200);

    expect(response.body).toEqual(mockTask);
    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      {
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
      },
      { new: true }
    );
  });

  test('should return 400 if title is missing', async () => {
    const response = await request(app)
      .put('/tasks/1')
      .send({
        description: 'Updated Description',
        completed: true,
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 if title is empty string', async () => {
    const response = await request(app)
      .put('/tasks/1')
      .send({
        title: '',
        description: 'Updated Description',
        completed: true,
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 404 if task is not found', async () => {
    Task.findByIdAndUpdate.mockResolvedValue(null);

    const response = await request(app)
      .put('/tasks/999')
      .send({
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
      })
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Task not found');
  });

  test('should return 500 if database error occurs', async () => {
    Task.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .put('/tasks/1')
      .send({
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
      })
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Internal server error');
  });
});