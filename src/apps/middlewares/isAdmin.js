module.exports = (req, res, next) => {
  // Deve ser usado após o middleware de auth, que popula req.user
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso negado: administrador apenas' });
  }
  return next();
};
