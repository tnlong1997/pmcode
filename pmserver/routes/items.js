var express = require('express');
var router = express.Router();

const itemController = require('../controllers/itemController');

// GET item listing
router.get('/', itemController.item_list);

// POST create item
router.post('/', itemController.create_item);

// PUT edit item
router.put('/:id', itemController.edit_item);

// DELETE delete item
router.delete('/:id', itemController.delete_item);

module.exports = router;
