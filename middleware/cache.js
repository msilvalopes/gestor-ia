const redis = require('redis');

// Criar cliente Redis
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

// Lidar com erros do Redis
client.on('error', (err) => {
  console.error('Erro no Redis:', err);
});

/**
 * Middleware para cache de respostas HTTP
 * @param {number} duration - Duração do cache em segundos
 * @returns {Function}
 */
const cache = (duration = 60) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      // Tentar obter do cache
      const cachedResponse = await client.get(key);

      if (cachedResponse) {
        console.log(`Cache HIT para ${req.originalUrl}`);
        return res.status(200).json(JSON.parse(cachedResponse));
      }

      // Se não estiver no cache, armazenar a resposta original
      const originalSend = res.send;
      res.send = function (body) {
        // Armazenar no cache
        client.setex(key, duration, JSON.stringify(body), (err) => {
          if (err) {
            console.error('Erro ao salvar no cache:', err);
          }
        });
        return originalSend.call(this, body);
      };

      next();
    } catch (error) {
      console.error('Erro no middleware de cache:', error);
      next();
    }
  };
};

module.exports = { cache, client };