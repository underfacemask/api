const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN } = require('../configs/jwt');

module.exports = {
  async register(req, res) {
    const { name, email, password, isAdmin = false } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, isAdmin });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return res.json({ token });
  }
};
