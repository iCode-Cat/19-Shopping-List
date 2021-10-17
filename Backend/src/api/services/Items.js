const { Items, ItemsCategory } = require('../models/ItemsSchema');

module.exports.addCategory = async (res, body) => {
  try {
    const data = new ItemsCategory({ ...body });
    await data.save();
    return data;
  } catch (error) {
    // Username already exists
    if (error.code === 11000) {
      throw new TypeError('This user exists');
    }
    // Username required
    if (error.errors.category_name) {
      throw new TypeError('Category name cannot be empty');
    }
    // Password required
    if (error.errors.category_id) {
      throw new TypeError('Category id cannot be empty');
    }
    // DB error
    throw new Error(`Server Error`);
  }
};
