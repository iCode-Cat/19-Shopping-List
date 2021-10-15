const { registerUser } = require('../services/Auth');
const passport = require('passport');

// @router /api/auth/register
// @desc POST User Registiration
module.exports.auth_register_post = async (req, res, next) => {
  try {
    const user = await registerUser(res, req.body);
    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      req.session.user = user;
      next();
    });
    res.status(200).send(`User ${user.username} created successfully`);
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
      return res.status(500).send('Server Error');
    }
    res.status(400).send(error.message);
  }
};

// @router /api/auth/login
// @desc POST User Registiration
module.exports.auth_login_post = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('User Not found');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send(user);
    });
  })(req, res, next);
};

module.exports.auth_user_get = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json('User not authenticated');
  // Send authenticated user
  res.status(200).json(req.user);
};
