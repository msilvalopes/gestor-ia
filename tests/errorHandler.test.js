const request = require('supertest');
const app = require('../server');

// Testes para o tratamento de erros genérico
describe('Error Handler', () => {
  test('should handle 404 errors correctly', async () => {
    const response = await request(app)
      .get('/non-existent-route')
      .expect(404);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Rota não encontrada');
  });

  test('should handle internal server errors correctly', async () => {
    // Mock uma função que vai causar erro interno
    const originalGetTask = require('../models/Task').getTask;
    
    require('../models/Task').getTask = jest.fn().mockImplementation(() => {
      throw new Error('Erro interno do servidor');
    });
    
    const response = await request(app)
      .get('/api/tasks/1')
      .expect(500);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Erro interno do servidor');
    
    // Restaurar a função original
    require('../models/Task').getTask = originalGetTask;
  });

  test('should handle validation errors correctly', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({})
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Título é obrigatório');
  });

  test('should handle database connection errors', async () => {
    // Mock a conexão com o banco de dados para simular erro
    const originalCreateConnection = require('../models/Task').createConnection;
    
    require('../models/Task').createConnection = jest.fn().mockImplementation(() => {
      throw new Error('Falha na conexão com o banco de dados');
    });
    
    const response = await request(app)
      .get('/api/tasks')
      .expect(500);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Falha na conexão com o banco de dados');
    
    // Restaurar a função original
    require('../models/Task').createConnection = originalCreateConnection;
  });
});