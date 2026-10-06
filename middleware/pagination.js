const pagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Validação de parâmetros
  if (page < 1) {
    return res.status(400).json({
      error: 'Page must be greater than 0'
    });
  }

  if (limit < 1 || limit > 100) {
    return res.status(400).json({
      error: 'Limit must be between 1 and 100'
    });
  }

  // Adiciona os parâmetros de paginação ao request
  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit
  };

  next();
};

module.exports = pagination;