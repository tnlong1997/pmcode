var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.user_list);

// POST user sign up
router.post('/', userController.user_sign_up);

module.exports = router;
