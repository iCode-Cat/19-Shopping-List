const { addCategory, addItem } = require('../services/Items');
const { ItemsCategory } = require('../models/ItemsSchema');

/* CATEGORY */

// @router /api/items/category/add
// @desc POST Create new item category
// @admin
module.exports.category_add_post = async (req, res) => {
  try {
    const post = await addCategory(res, req.body);
    res.status(200).send('New item category successfully created.');
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
      return res.status(500).send('Server Error');
    }
    res.status(400).send(error.message);
  }
};

module.exports.category_find_get = async (req, res) => {
  try {
    const find = await ItemsCategory.findOne({ category_id: 1 }).populate(
      'items'
    );
    console.log(find);
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
      return res.status(500).send('Server Error');
    }
    res.status(400).send(error.message);
  }
};

/* ITEMS */

// @router /api/items/add
// @desc POST Create new item
// @private
module.exports.item_add_post = async (req, res) => {
  try {
    const post = await addItem(res, req.body);
    res.status(200).send('New item successfully created.');
  } catch (error) {
    if (error.name !== 'TypeError') {
      console.log(error);
      return res.status(500).send('Server Error');
    }
    res.status(400).send(error.message);
  }
};
