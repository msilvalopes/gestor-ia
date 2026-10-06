const request = require('supertest');
const app = require('../server');

// Teste para verificar a autenticação básica
describe('Middleware de Autenticação', () => {
  test('Deve permitir acesso com credenciais válidas', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=') // admin:password
      .expect(200);
    
    expect(response.body).toBeDefined();
  });

  test('Deve negar acesso sem credenciais', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .expect(401);
    
    expect(response.body.error).toBe('Autenticação básica requerida');
  });

  test('Deve negar acesso com credenciais inválidas', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Basic dXN1YXJpbzpwYXNzd29yZA==') // usuario:password
      .expect(401);
    
    expect(response.body.error).toBe('Credenciais inválidas');
  });
});