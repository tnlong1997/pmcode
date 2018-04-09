var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController');

/* GET orders listing. */
router.get('/', orderController.order_list);

// POST user sign up
router.post('/', orderController.create_order);

module.exports = router;
