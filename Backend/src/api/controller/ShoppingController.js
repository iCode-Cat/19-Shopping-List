const {
  createList,
  getList,
  getAllList,
  getListOne,
  updateSelectedItem,
} = require('../services/Shopping');

const Shopping = require('../models/ShoppingList');

/* ITEMS */

// @router /api/shopping/item/add
// @desc POST Allow user to add selected item to the shopping cart
// @private
module.exports.user_list_post = async (req, res) => {
  const body = req.body;
  try {
    await createList(res, body, req);
    res.status(200).send('Items successfully updated.');
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

// @router /api/shopping/status
// @desc POST Allow user to change the status of current list
// @private
module.exports.user_list_status = async (req, res) => {
  const body = req.body;
  const { id, isCompleted, isCanceled } = body;
  try {
    const list = await Shopping.findByIdAndUpdate(
      { _id: id },
      { isCompleted, isCanceled }
    );
    res.status(200).send(`${id} status changed.`);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

// @router /api/shopping/item/find
// @desc GET Bring current shopping list of the user
// @private
module.exports.user_list_get = async (req, res) => {
  const body = req.body;
  try {
    const list = await getList(res, body, req);
    if (!list)
      return res.status(404).send("You don't have a shopping list.Create one!");
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

// @router /api/shopping/item/find/:id
// @desc GET Bring shopping list by id
// @private
module.exports.user_list_getOne = async (req, res) => {
  const body = req.body;
  try {
    const list = await getListOne(res, body, req);
    if (!list)
      return res
        .status(404)
        .send("Page does not exists or you don't a permission to visit.");
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

// @router /api/shopping/item/all
// @desc GET Bring all shopping list of user
// @private
module.exports.user_AllList_get = async (req, res) => {
  const body = req.body;
  try {
    const list = await getAllList(res, body, req);
    if (!list)
      return res.status(404).send("You don't have a shopping list.Create one!");
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};

// @router /api/shopping/item/update
// @desc GET Update spesific selected ID's check status.
// @private
module.exports.user_item_check = async (req, res) => {
  const body = req.body;
  try {
    await updateSelectedItem(body);
    res.status(200).send('Item updated.');
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
};
