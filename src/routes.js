const express = require('express');
const UserController = require('./controllers/UserController');
const ClientController = require('./controllers/ClientController');
const ProjectController = require('./controllers/ProjectController');
const BudgetController = require('./controllers/BudgetController');

const auth = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin');

const routes = express.Router();

// Rotas públicas
routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

// A partir daqui, todas exigem token válido
routes.use(auth);

// Clients
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', isAdmin, ClientController.store);      // só admins
routes.put('/clients/:id', isAdmin, ClientController.update); // só admins
routes.delete('/clients/:id', isAdmin, ClientController.destroy);

// Projects
routes.get('/projects', ProjectController.index);
routes.get('/projects/:id', ProjectController.show);
routes.post('/projects', isAdmin, ProjectController.store);
routes.put('/projects/:id', isAdmin, ProjectController.update);
routes.delete('/projects/:id', isAdmin, ProjectController.destroy);

// Budgets
routes.get('/budgets', BudgetController.index);
routes.get('/budgets/:id', BudgetController.show);
routes.post('/budgets', isAdmin, BudgetController.store);
routes.put('/budgets/:id', isAdmin, BudgetController.update);
routes.delete('/budgets/:id', isAdmin, BudgetController.destroy);

module.exports = routes;
