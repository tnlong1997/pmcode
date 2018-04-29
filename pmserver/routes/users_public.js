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
 * @apiSuccess {String} user_id New user's ID.
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
 * 			user_id: "this_will_be_the_id"
 * 		}
 */
router.post('/', userController.user_sign_up);

/**
 *
 * @api {post} /public/users/login Login new user
 * @apiVersion 0.1.0
 * @apiName LoginUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Login new user.
 *
 * @apiParam {String} email Email of user.
 * @apiParam {String} password Password for this account.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} token New user's token.
 *
 * @apiError DatabaseError Error with database.
 * @apiError RequiredFieldMissing Required to fill all fields.
 * @apiError InvalidInput Inputs for required field invalid.
 * @apiError WrongPassword Input password incorrect.
 * @apiError UserNotFound User cannot be found by database.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			token: "this_will_be_the_token"
 * 		}
 */
router.post('/login', userController.user_log_in);

module.exports = router;