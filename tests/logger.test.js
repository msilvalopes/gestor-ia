const fs = require('fs');
const path = require('path');

// Mock do módulo fs para evitar escrita real no arquivo
jest.mock('fs');

const logger = require('../middleware/logger');

describe('Logger Middleware', () => {
  let mockReq, mockRes, mockNext;
  
  beforeEach(() => {
    // Mock das propriedades da requisição
    mockReq = {
      method: 'GET',
      url: '/api/tasks',
      headers: {
        'user-agent': 'test-agent'
      },
      ip: '127.0.0.1'
    };
    
    // Mock do response
    mockRes = {
      statusCode: 200,
      on: jest.fn(),
      once: jest.fn()
    };
    
    // Mock do next
    mockNext = jest.fn();
    
    // Mock do fs.writeFileSync
    fs.writeFileSync = jest.fn();
  });
  
  it('should log request information correctly', () => {
    const originalWriteFileSync = fs.writeFileSync;
    
    logger(mockReq, mockRes, mockNext);
    
    expect(fs.writeFileSync).toHaveBeenCalled();
    
    // Verificar se o conteúdo do log está correto
    const callArgs = fs.writeFileSync.mock.calls[0];
    const logContent = callArgs[1];
    
    expect(logContent).toContain('GET');
    expect(logContent).toContain('/api/tasks');
    expect(logContent).toContain('127.0.0.1');
    expect(logContent).toContain('test-agent');
  });
  
  it('should call next middleware', () => {
    logger(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalled();
  });
});