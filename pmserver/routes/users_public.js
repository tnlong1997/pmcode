var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/**
 *
 * @api {post} /public/users Sign up new user
 * @apiVersion 0.1.0
 * @apiName SignUpUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Sign up new user.
 *
 * @apiParam {String} email Email of user.
 * @apiParam {String} password Password for this account.
 * @apiParam {String} firstName User's firstname.
 * @apiParam {String} lastName User's lastName. 
 * @apiParam {Date} dateOfBirth User's DOB.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 *
 * @apiError DatabaseError Error with database.
 * @apiError RequiredFieldMissing Required to fill all fields.
 * @apiError InvalidInput Inputs for required field invalid.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Order and Item Created."
 * 		}
 */
router.post('/', userController.user_sign_up);

/* POST user log in */
router.post('/login', userController.user_log_in);

module.exports = router;
