const { registerUser } = require('../services/Auth');
// @router /api/auth/register
// @desc POST User Registiration
module.exports.auth_register_post = async (req, res, next) => {
  try {
    await registerUser(res, req.body);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.name);
  }
};

// @router /api/auth/login
// @desc POST User Registiration
module.exports.auth_login_post = (req, res) => {
  res.send('Login User');
};
