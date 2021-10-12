const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  register_date: {
    type: String,
    default: () => moment().format('DD/MM/YYYY hh:mm'),
  },
});

module.exports = User = mongoose.model('user', userSchema);
