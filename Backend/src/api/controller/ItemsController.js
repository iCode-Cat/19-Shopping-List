const { addCategory } = require('../services/Items');

// @router /api/items/category/add
// @desc POST Create new item category
// @admin
module.exports.category_post = async (req, res) => {
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
