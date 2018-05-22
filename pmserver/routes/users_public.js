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
 * @apiError 400 Bad Request
 * @apiError 600 Database error
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
 * @apiError 400 Bad Request
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 * @apiError 610 Wrong password
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

/**
*/
router.post('/forgot', userController.user_forgot_password);

/**
*/
router.get('/reset/:token', userController.user_reset_password_get);

/**
*/
router.post('/reset/:token', userController.user_reset_password_post);

module.exports = router;
