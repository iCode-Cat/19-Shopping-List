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
      console.log('Shopping list successfully created for this user.');
    }

    const itemMap = items.map(async (item) => {
      //   // Register items
      //   const registerItems = await SelectedItems.create({
      //     user: userId,
      //     item: item.id,
      //   });
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
    res.status(200).send('Items successfully updated.');
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
