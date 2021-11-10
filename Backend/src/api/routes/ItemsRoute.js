const express = require('express');
const Router = express.Router();
const {
  category_add_post,
  category_find_get,
  item_add_post,
  item_find,
} = require('../controller/ItemsController');
const { isAdmin, isAuth } = require('../middlewares/authMiddleware');

Router.post('/category/add', isAuth, category_add_post);
Router.get('/category/find', isAuth, category_find_get);
Router.post('/add', isAuth, item_add_post);
Router.get('/find/:id', isAuth, item_find);
module.exports = Router;
