var express = require('express');
var router = express.Router();

const searchController = require('../controllers/searchController');

router.post('/', searchController.search);

module.exports = router;