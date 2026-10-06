const cors = require('cors');

const corsOptions = {
  origin: '*', // Permite todos os domínios (apenas para desenvolvimento)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;