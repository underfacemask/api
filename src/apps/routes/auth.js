const express = require('express');
const rateLimit = require('express-rate-limit');
const UserController = require('../controllers/UserController');
const { forgotPassword, resetPassword } = require('../controllers/PasswordController');
// importe o middleware que está em middlewares/auth.js
const ensureAuth = require('../../middlewares/auth');

const router = express.Router();

// limiter e endpoints de register/login como antes…
router.post('/register', UserController.register);
router.post('/login', loginLimiter, UserController.login);

// Exemplo de rota protegida usando o middleware:
router.get('/me', ensureAuth, UserController.showProfile);

// Rotas de recuperação de senha (não precisam de auth)
router.post('/password/forgot', forgotPassword);
router.post('/password/reset', resetPassword);

module.exports = router;
