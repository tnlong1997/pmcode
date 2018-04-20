var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.user_list);

// POST user sign up
router.post('/', userController.user_sign_up);

/* POST user log in */
router.post('/login', userController.user_log_in);

/* PUT change user's password */
router.put('/:id/password', userController.user_change_password);

/* DELETE delete user's */
router.delete('/:id', userController.user_delete);

module.exports = router;
