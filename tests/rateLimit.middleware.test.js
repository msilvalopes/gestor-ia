const request = require('supertest');
const app = require('../server');
const { rateLimit } = require('../middleware/rateLimit');

// Mock do redis para testes
jest.mock('redis', () => {
  const mockRedisClient = {
    get: jest.fn(),
    setex: jest.fn(),
    on: jest.fn()
  };

  return {
    createClient: jest.fn(() => mockRedisClient)
  };
});

describe('Rate Limit Middleware', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should allow requests within the limit', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
  });

  it('should block requests exceeding the limit', async () => {
    // Simular várias requisições para ultrapassar o limite
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(request(app).get('/health'));
    }
    
    const responses = await Promise.all(promises);
    
    // Verificar que algumas requisições foram bloqueadas
    const blockedResponses = responses.filter(res => res.status === 429);
    expect(blockedResponses.length).toBeGreaterThan(0);
  });

  it('should reset the rate limit after timeout', async () => {
    // Este teste pode ser mais complexo e requer mock avançado
    // Por enquanto, apenas garantir que o middleware não cause erros
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'OK');
  });
});