const express = require('express');

const stackController = require('../controllers/stack.controller');

const stackRouter = express.Router();

stackRouter.get('/', stackController.getStack);
stackRouter.post('/push', stackController.push);
stackRouter.get('/pop', stackController.pop);
stackRouter.post('/size', stackController.changeSize);

module.exports = stackRouter;