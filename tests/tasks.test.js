const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

// Mock the Task model
jest.mock('../models/Task');

describe('DELETE /tasks/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should delete a task successfully', async () => {
    const mockTask = { _id: '1234567890abcdef12345678', title: 'Test Task', completed: false };
    Task.findByIdAndDelete.mockResolvedValue(mockTask);

    const response = await request(app)
      .delete('/tasks/1234567890abcdef1235678')
      .expect(200);

    expect(response.body).toEqual({ message: 'Task deleted successfully' });
    expect(Task.findByIdAndDelete).toHaveBeenCalledWith('1234567890abcdef12345678');
  });

  test('should return 404 if task is not found', async () => {
    Task.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app)
      .delete('/tasks/1234567890abcdef12345678')
      .expect(404);

    expect(response.body).toEqual({ message: 'Task not found' });
  });

  test('should return 500 if an error occurs', async () => {
    Task.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .delete('/tasks/1234567890abcdef12345678')
      .expect(500);

    expect(response.body).toEqual({ message: 'Internal server error' });
  });

  test('should return 400 if id is invalid', async () => {
    const response = await request(app)
      .delete('/tasks/invalid-id')
      .expect(400);

    expect(response.body).toEqual({ message: 'Invalid task ID' });
  });
});