const ShoppingList = require('../models/ShoppingList');
const SelectedItems = require('../models/SelectedItem');

// @Mongoose function handler for Items

// create a shopping list
module.exports.createList = async (res, body, req) => {
  console.log(body);
  const { items, title } = body;
  const userId = req.user.id;
  try {
    // Check if there is active list. If user have already, just update the items
    const findList = await ShoppingList.findOne({
      user: userId,
      isCompleted: false,
      isCanceled: false,
    });

    if (!findList) {
      const createList = await ShoppingList.create({
        user: userId,
        title,
      });
    }

    const itemMap = items.map(async (item) => {
      // Register items
      const registerItems = await SelectedItems.create({
        user: userId,
        item: item.id,
      });
      // Update existing shopping list
      const updateList = await ShoppingList.updateOne(
        {
          user: userId,
          isCompleted: false,
          isCanceled: false,
        },
        { $push: { items: item.id } }
      );
    });
    await Promise.all(itemMap);
  } catch (error) {
    // if (error.errors.category_name) {
    //   throw new TypeError('Category name cannot be empty');
    // }
    // if (error.errors.category_id) {
    //   throw new TypeError('Category id cannot be empty');
    // }
    // DB error
    throw new Error(error);
  }
};

module.exports.getList = async (res, body, req) => {
  const userId = req.user.id;
  try {
    const findList = await ShoppingList.findOne({
      user: userId,
      isCompleted: false,
      isCanceled: false,
    });
    if (findList) return findList;
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getListOne = async (res, body, req) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const findList = await ShoppingList.findOne({
      _id: id,
      user: userId,
    });
    if (findList) return findList;
    return false;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.getAllList = async (res, body, req) => {
  const userId = req.user.id;
  try {
    const findList = await ShoppingList.find({
      user: userId,
    });
    if (findList) return findList;
    return false;
  } catch (error) {
    throw new Error(error);
  }
};
