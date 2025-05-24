const crypto = require('crypto');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mailer = require('../../configs/mail');

module.exports = {
  // Envia token de recuperação
  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const token = (await promisify(crypto.randomBytes)(20)).toString('hex');
    const expires = Date.now() + 3600 * 1000; // 1 hora

    user.passwordResetToken = token;
    user.passwordResetExpires = expires;
    await user.save();

    await mailer.sendMail({
      to: email,
      subject: 'Recuperação de senha Zeus',
      html: `
        <p>Você solicitou a recuperação de senha para o Zeus.</p>
        <p>Use este token para resetar sua senha (válido por 1 hora):</p>
        <h3>${token}</h3>
      `,
    });

    return res.json({ message: 'Token de recuperação enviado por e-mail.' });
  },

  // Recebe token e nova senha
  async resetPassword(req, res) {
    const { email, token, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (
      token !== user.passwordResetToken ||
      Date.now() > user.passwordResetExpires
    ) {
      return res.status(400).json({ error: 'Token inválido ou expirado' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return res.json({ message: 'Senha redefinida com sucesso.' });
  },
};
