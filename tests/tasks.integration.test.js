const request = require('supertest');
const app = require('../server');
const Task = require('../models/Task');

// Limpar o banco de dados antes dos testes
beforeEach(async () => {
  await Task.deleteMany({});
});

// Teste para criar uma nova tarefa
describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      completed: false,
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(taskData.title);
    expect(response.body.description).toBe(taskData.description);
    expect(response.body.completed).toBe(taskData.completed);
  });

  it('should return 400 if title is missing', async () => {
    const taskData = {
      description: 'This is a test task',
      completed: false,
    };

    await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(400);
  });
});

// Teste para obter todas as tarefas
describe('GET /api/tasks', () => {
  it('should get all tasks', async () => {
    // Criar algumas tarefas no banco de dados
    await Task.create([
      { title: 'Task 1', description: 'Description 1', completed: false },
      { title: 'Task 2', description: 'Description 2', completed: true },
    ]);

    const response = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('title', 'Task 1');
    expect(response.body[1]).toHaveProperty('title', 'Task 2');
  });
});

// Teste para obter uma tarefa específica por ID
describe('GET /api/tasks/:id', () => {
  it('should get a task by id', async () => {
    // Criar uma tarefa no banco de dados
    const task = await Task.create({
      title: 'Test Task',
      description: 'This is a test task',
      completed: false,
    });

    const response = await request(app)
      .get(`/api/tasks/${task._id}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', task._id.toString());
    expect(response.body.title).toBe(task.title);
  });

  it('should return 404 if task not found', async () => {
    await request(app)
      .get('/api/tasks/507f1f77bcf86cd799439011')
      .expect(404);
  });
});

// Teste para atualizar uma tarefa
describe('PUT /api/tasks/:id', () => {
  it('should update a task', async () => {
    // Criar uma tarefa no banco de dados
    const task = await Task.create({
      title: 'Original Title',
      description: 'Original Description',
      completed: false,
    });

    const updatedData = {
      title: 'Updated Title',
      description: 'Updated Description',
      completed: true,
    };

    const response = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body).toHaveProperty('_id', task._id.toString());
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.description).toBe(updatedData.description);
    expect(response.body.completed).toBe(updatedData.completed);
  });

  it('should return 400 if validation fails', async () => {
    const task = await Task.create({
      title: 'Original Title',
      description: 'Original Description',
      completed: false,
    });

    const updatedData = {
      title: '', // Título vazio não é válido
      description: 'Updated Description',
      completed: true,
    };

    await request(app)
      .put(`/api/tasks/${task._id}`)
      .send(updatedData)
      .expect(400);
  });
});

// Teste para deletar uma tarefa
describe('DELETE /api/tasks/:id', () => {
  it('should delete a task', async () => {
    // Criar uma tarefa no banco de dados
    const task = await Task.create({
      title: 'Test Task',
      description: 'This is a test task',
      completed: false,
    });

    await request(app)
      .delete(`/api/tasks/${task._id}`)
      .expect(200);

    // Verificar se a tarefa foi deletada
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });

  it('should return 404 if task not found', async () => {
    await request(app)
      .delete('/api/tasks/507f1f77bcf86cd799439011')
      .expect(404);
  });
});