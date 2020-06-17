const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const userController = require('./controllers/userController');
const sessionControler = require('./controllers/sessionController');
const itemController = require('./controllers/itemController');

routes.get('/ping', async (request, response) => {
    return response.json('PONG');
});

routes.post('/user', celebrate({ // validação de body, creação de usuário
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        senha: Joi.string().required(),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(9).max(11),
        cep: Joi.string().required(),
        cidade: Joi.string().required(),
        bairro: Joi.string().required(),
        rua: Joi.string().required(),
        numero: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), userController.create);

routes.get('/user', userController.fetch);
routes.get('/recover', userController.recover);

routes.post('/login', sessionControler.create);

routes.post('/item', itemController.create);
routes.get('/items', itemController.index);
routes.get('/own/items', itemController.fetch);
routes.delete('/item/:id', itemController.delete);



module.exports = routes;