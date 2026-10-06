const request = require('supertest');
const app = require('../server');

// Teste para verificar se o rate limiting está funcionando
describe('Rate Limit Middleware', () => {
  it('should limit requests per IP', async () => {
    // Faz várias requisições para testar o limite
    const responses = await Promise.all(
      Array.from({ length: 105 }, () => 
        request(app).get('/health')
      )
    );

    // Verifica que as primeiras 100 requisições são bem-sucedidas
    expect(responses.slice(0, 100).every(r => r.status === 200)).toBe(true);
    
    // Verifica que as últimas 5 requisições falham com status 429 (Too Many Requests)
    expect(responses.slice(100).every(r => r.status === 429)).toBe(true);
  });
});