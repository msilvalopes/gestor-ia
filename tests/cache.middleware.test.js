const request = require('supertest');
const app = require('../server');
const { client } = require('../middleware/cache');

// Mock do cliente Redis para testes
jest.mock('redis', () => {
  const mockClient = {
    get: jest.fn(),
    setex: jest.fn(),
    on: jest.fn(),
  };

  return {
    createClient: jest.fn(() => mockClient),
  };
});

// Mock do middleware de cache
jest.mock('../middleware/cache', () => {
  const original = require.requireActual('../middleware/cache');
  
  return {
    ...original,
    client: {
      get: jest.fn(),
      setex: jest.fn(),
      on: jest.fn(),
    }
  };
});

describe('Cache Middleware', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Fechar conexão Redis após todos os testes
    await client.quit();
  });

  it('deve aplicar cache nas requisições GET', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
  });

  it('deve retornar dados do cache quando disponíveis', async () => {
    // Mock para simular que há dados no cache
    client.get.mockImplementation((key, callback) => {
      callback(null, JSON.stringify({ message: 'cached data' }));
    });

    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'cached data' });
  });

  it('deve salvar dados no cache após requisição', async () => {
    const response = await request(app).get('/tasks');
    
    // Verificar que setex foi chamado
    expect(client.setex).toHaveBeenCalled();
  });
});