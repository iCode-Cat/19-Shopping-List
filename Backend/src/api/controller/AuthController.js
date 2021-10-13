const { registerUser } = require('../services/Auth');

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

    console.log(req.isAuthenticated());
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
module.exports.auth_login_post = (req, res) => {
  res.send(req.user);
};
