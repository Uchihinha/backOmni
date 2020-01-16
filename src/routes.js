const { Router } = require('express');

const DevController = require('./controllers/DevController');

const routes = Router();

/**
 * MÉTODOS HTTP
 * 
 * GET      -> usado para retornar alguna informação
 * POST     -> usado para salvar alguma informação
 * PUT      -> usado para editar alguma informação
 * DELETE   -> usado para deletar alguma informação
*/

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

module.exports = routes;