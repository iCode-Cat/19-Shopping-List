const express = require('express');
const Router = express.Router();
const { auth_get } = require('../controller/AuthController');

Router.get('/auth/api', auth_get);

module.exports = Router;
