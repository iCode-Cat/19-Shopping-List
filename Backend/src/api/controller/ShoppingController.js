const { createList } = require('../services/Shopping');
/* ITEMS */

// @router /api/shopping/item/add
// @desc POST Allow user to add selected item to the shopping cart
// @private
module.exports.user_item_post = async (req, res) => {
  const body = req.body;
  await createList(res, body, req);
};
