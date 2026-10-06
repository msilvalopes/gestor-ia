const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      error: 'Autenticação básica requerida'
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Validação simples de usuário e senha (em produção, verificar em banco de dados)
  if (username === 'admin' && password === 'password') {
    req.user = { username };
    next();
  } else {
    return res.status(401).json({
      error: 'Credenciais inválidas'
    });
  }
};

module.exports = auth;