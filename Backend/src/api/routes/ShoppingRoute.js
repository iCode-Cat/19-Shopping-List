const express = require('express');
const Router = express.Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { user_item_post } = require('../controller/ShoppingController');

Router.post('/item/add', isAuth, user_item_post);

module.exports = Router;
