const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be empty.'],
    unique: [true, 'This username already taken.'],
    trim: true,
  },
  password: {
    type: String,
    min: [8, 'Password must be at least 8 characters.'],
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  register_date: {
    type: String,
    default: () => moment().format('DD - MM - YYYY hh:m'),
  },
});

module.exports = User = mongoose.model('user', userSchema);
