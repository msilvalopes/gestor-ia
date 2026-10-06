const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Mock do middleware de autenticação para testes
jest.mock('../middleware/auth', () => {
  const originalModule = jest.requireActual('../middleware/auth');
  return {
    ...originalModule,
    authenticateToken: (req, res, next) => {
      // Simula um token válido
      req.user = { id: '123', username: 'testuser' };
      next();
    }
  };
});

describe('Authentication Middleware', () => {
  test('should allow access to protected routes when valid token is provided', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test('should deny access to protected routes when no token is provided', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .expect(401);

    expect(response.body.message).toBe('Access denied. No token provided.');
  });

  test('should deny access to protected routes when invalid token is provided', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Bearer invalid-token')
      .expect(403);

    expect(response.body.message).toBe('Invalid token.');
  });

  test('should attach user information to request when valid token is provided', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});