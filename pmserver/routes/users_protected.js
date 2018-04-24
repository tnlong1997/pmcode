var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');


router.get('/', userController.user_list);

/* GET user's profile */
router.get('/:id/profile', userController.user_get_profile);

/* PUT change user's password */
router.put('/:id/password', userController.user_change_password);

/* PUT update user's profile */
router.put('/:id/profile', userController.user_update_profile);

/* DELETE delete user's */
router.delete('/:id', userController.user_delete);

module.exports = router;
