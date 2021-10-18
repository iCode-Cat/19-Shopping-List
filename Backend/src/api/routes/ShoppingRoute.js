const express = require('express');
const Router = express.Router();
const { isAuth } = require('../middlewares/authMiddleware');
const {
  user_list_post,
  user_list_get,
  user_AllList_get,
  user_list_getOne,
} = require('../controller/ShoppingController');

Router.post('/item/add', isAuth, user_list_post);
Router.get('/item/find', isAuth, user_list_get);
Router.get('/item/all', isAuth, user_AllList_get);
Router.get('/item/find/:id', isAuth, user_list_getOne);

module.exports = Router;
