var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController');

// GET orders listing
router.get('/', orderController.order_list);

// POST create order
router.post('/', orderController.create_order);

// PUT edit order
router.put('/:id', orderController.edit_order);

// DELETE delete order
router.delete('/:id', orderController.delete_order);

module.exports = router;
