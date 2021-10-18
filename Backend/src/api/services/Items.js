const { Items, ItemsCategory } = require('../models/ItemsSchema');

// @Mongoose function handler for Items

// Add category
module.exports.addCategory = async (res, body) => {
  try {
    const data = new ItemsCategory({ ...body });
    await data.save();
    return data;
  } catch (error) {
    if (error.errors.category_name) {
      throw new TypeError('Category name cannot be empty');
    }
    if (error.errors.category_id) {
      throw new TypeError('Category id cannot be empty');
    }
    // DB error
    throw new Error(`Server Error`);
  }
};

// Item add
module.exports.addItem = async (res, body) => {
  try {
    const data = new Items({ ...body });
    // Register item id to related category
    const updateCategory = await ItemsCategory.updateOne(
      { category_id: data.category_id },
      { $push: { items: data.id } }
    );
    await data.save();
    return data;
  } catch (error) {
    if (error.errors.category) {
      throw new TypeError('Category id cannot be empty');
    }
    if (error.errors.item_name) {
      throw new TypeError('Item name cannot be empty');
    }
    // DB error
    throw new Error(`Server Error`);
  }
};
