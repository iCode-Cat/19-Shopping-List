const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  item_image: String,
  category_id: {
    type: String,
    required: true,
  },
  Note: String,
});

const ItemsCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }],
});

module.exports.Items = mongoose.model('item', ItemsSchema);
module.exports.ItemsCategory = mongoose.model(
  'itemsCategory',
  ItemsCategorySchema
);
