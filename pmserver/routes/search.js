var express = require('express');
var router = express.Router();

const searchController = require('../controllers/searchController');

router.post('/order-name', searchController.search_order_name);

router.post('/item-name', searchController.search_item_name);

router.post('/item-price', searchController.search_item_price);

router.post('/traveler-fee', searchController.search_traveler_fee);

module.exports = router;