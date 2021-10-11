const express = require('express');
const passport = require('passport');
const Router = express.Router();
const {
  auth_register_post,
  auth_login_post,
} = require('../controller/AuthController');

Router.post('/api/auth/register', auth_register_post);
Router.post(
  '/api/auth/login',
  passport.authenticate('local', {
    failureRedirect: '/fail',
  }),
  auth_login_post
);

module.exports = Router;
