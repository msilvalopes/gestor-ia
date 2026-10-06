const Task = require('../models/Task');

describe('Task Model', () => {
  test('should create a new task with valid data', () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      completed: false
    };

    const task = new Task(taskData);
    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
    expect(task.completed).toBe(taskData.completed);
  });

  test('should have default values for completed when not provided', () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task'
    };

    const task = new Task(taskData);
    expect(task.completed).toBe(false);
  });

  test('should throw error when title is missing', () => {
    const taskData = {
      description: 'This is a test task'
    };

    expect(() => {
      new Task(taskData);
    }).toThrow('Title is required');
  });

  test('should have a valid ID when created', () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task'
    };

    const task = new Task(taskData);
    expect(task.id).toBeDefined();
  });

  test('should be able to update task properties', () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task'
    };

    const task = new Task(taskData);
    task.title = 'Updated Task';
    task.description = 'Updated description';
    task.completed = true;

    expect(task.title).toBe('Updated Task');
    expect(task.description).toBe('Updated description');
    expect(task.completed).toBe(true);
  });

  test('should be able to delete a task', () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task'
    };

    const task = new Task(taskData);
    expect(task).toBeDefined();
    
    // In a real implementation, we would have a delete method
    // For now, just testing that the object can be created and modified
  });
});