require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'troque_esta_chave_antes_em_producao',
  expiresIn: process.env.JWT_EXPIRES_IN || '8h'
};
