const express = require('express');
const passport = require('passport');
const Router = express.Router();
const {
  auth_register_post,
  auth_login_post,
  auth_user_get,
} = require('../controller/AuthController');

Router.post('/register', auth_register_post);
Router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  auth_login_post
);
Router.get('/user', auth_user_get);

module.exports = Router;
