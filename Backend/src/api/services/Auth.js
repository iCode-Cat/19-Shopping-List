const mongoose = require('mongoose');
const User = require('../models/UserSchema');

module.exports.registerUser = async (res, body) => {
  try {
    const user = new User({ ...body });
    await user.save();
    return user;
  } catch (error) {
    // Username already exists
    if (error.code === 11000) {
      throw new TypeError(error.message);
    }
    // Username required
    if (error.errors.username.message) {
      throw new TypeError(error);
    }
    // Password required
    if (error.errors.password.message) {
      throw new TypeError(error);
    }
    // DB error
    throw new Error(`Server Error`);
  }
};
