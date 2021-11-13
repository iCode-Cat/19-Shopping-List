const mongoose = require('mongoose');
const moment = require('moment');

const shoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    default: 'Shopping List',
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'selecteditem' }],
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  date: {
    type: String,
    default: () => moment().format('ddd MM.DD.YYYY'),
  },
});

module.exports = List = mongoose.model('shoppinglist', shoppingListSchema);
