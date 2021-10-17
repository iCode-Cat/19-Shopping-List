const mongoose = require('mongoose');
const User = require('../models/UserSchema');

// @Mongoose function handler for Users

module.exports.registerUser = async (res, body) => {
  try {
    const user = new User({ ...body });
    await user.save();
    return user;
  } catch (error) {
    // Username already exists
    if (error.code === 11000) {
      throw new TypeError('This user exists');
    }
    // Username required
    if (error.errors.username) {
      throw new TypeError('Username cannot be empty');
    }
    // Password required
    if (error.errors.password) {
      throw new TypeError('Password cannot be empty');
    }
    // DB error
    throw new Error(`Server Error`);
  }
};
