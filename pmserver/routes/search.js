var express = require('express');
var router = express.Router();

const searchController = require('../controllers/searchController');

router.post('/order-name', searchController.search_name);

module.exports = router;