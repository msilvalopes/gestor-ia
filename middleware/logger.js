const fs = require('fs');
const path = require('path');

// Criar diretório de logs se não existir
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, 'requests.log');

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || '';
  const ip = req.ip || req.connection.remoteAddress || '';

  const logEntry = `${timestamp} - ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}\n`;

  // Escrever no arquivo de log
  fs.appendFileSync(logFile, logEntry);

  console.log(logEntry.trim());

  next();
};

module.exports = logger;