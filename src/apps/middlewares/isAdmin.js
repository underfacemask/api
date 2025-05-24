// src/middlewares/isAdmin.js
module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso negado: apenas admins' });
  }
  return next();
};
