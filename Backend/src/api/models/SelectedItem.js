const mongoose = require('mongoose');
const moment = require('moment');

const SelectedItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
  itemName: {
    type: String,
    default: 'untitled',
  },
  shoppingListId: { type: String },
  quantity: {
    type: Number,
    default: 1,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = SelectedItem = mongoose.model(
  'selecteditem',
  SelectedItemSchema
);
