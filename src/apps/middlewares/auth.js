const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret: JWT_SECRET } = require('../configs/jwt');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Usuário inválido' });
    }
    req.user = { id: user.id, isAdmin: user.isAdmin };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
