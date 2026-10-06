const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erros HTTP padrão
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  // Erros de validação do Joi
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: err.details.map(detail => detail.message)
    });
  }

  // Erros de banco de dados (ex: chave única violada)
  if (err.code === '23505') {
    return res.status(409).json({
      error: 'Conflito de dados',
      message: 'Registro já existe'
    });
  }

  // Resposta genérica para outros erros
  res.status(status).json({
    error: message
  });
};

module.exports = errorHandler;