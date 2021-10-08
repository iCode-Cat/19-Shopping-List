const mongoose = require('mongoose');
const User = require('../models/UserSchema');

module.exports.registerUser = async (res, body) => {
  try {
    const user = new User({ ...body });
    await user.save();
    res.status(200).send(`User ${user.username} created successfully`);
  } catch (error) {
    // Username already exists
    if (error.code === 11000) {
      throw new Error(`This username is already taken`);
    }
    // DB error
    throw new Error(`Server Error`);
  }
};
