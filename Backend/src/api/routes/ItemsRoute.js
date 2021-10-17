const express = require('express');
const Router = express.Router();
const { category_post } = require('../controller/ItemsController');
const { isAdmin } = require('../middlewares/authMiddleware');

Router.post('/category/add', isAdmin, category_post);

module.exports = Router;
