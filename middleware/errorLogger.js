const fs = require('fs');
const path = require('path');

// Garantir que o diretório de logs exista
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${req.method} ${req.path} - ERROR: ${err.message}\n${err.stack || 'No stack trace'}\n---\n`;

  // Escrever no arquivo de log
  const logFilePath = path.join(logDir, 'error.log');
  fs.appendFileSync(logFilePath, logMessage);

  console.error(logMessage); // Também logar no console

  next(err); // Passar o erro para o próximo middleware
};

module.exports = errorLogger;