const {Router} = require('express');

const routes = new Router();

routes.get('/health', (req, res) => {
    return res.status(200).json({status: 'Boa tarde'});
});

module.exports = routes;