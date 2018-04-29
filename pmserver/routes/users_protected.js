var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/**
 * @api {get} /protected/ Get the list of all user.
 * @apiVersion 0.1.0
 * @apiName GetUserList
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription This will return the list of all users and can only be accessed by admin
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {Object} data List of users.
 *
 * @apiError DatabaseError Unable to access to database.
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "User list received.",
 * 			items: {
 *					"_id": "5adaa1a33ab44a3d18f41bd9",
            		"email": "hoangnguyen@gmail.com",
            		"password": "check",
            		"profile" : {}
 * 					}
 * 		}
 *
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 *		{
 *			success: false,
 *			code: 400,
 *			status: "Unable to access to database",
 *			err: DatabaseError
 *		}
 * 
 */
router.get('/', userController.user_list);

/**
 * @api {get} /protected/users/:id/profile Get the profile of current user.
 * @apiVersion 0.1.0
 * @apiName GetUserProfile
 * @apiGroup User
 * @apiPermission user
 *
 * @apiDescription Get the profile of the current user.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {Object} profile Profile of current user.
 *
 * @apiError DatabaseError Unable to access to database.
 * 
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Profile received.",
 * 			profile: {}
 * 		}
 *
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 *		{
 *			success: false,
 *			code: 400,
 *			status: "Unable to access to database",
 *			err: DatabaseError
 *		}
 * 
 */
router.get('/:id/profile', userController.user_get_profile);

/**
 *
 * @api {put} /protected/users/:id/password Change user's password
 * @apiVersion 0.1.0
 * @apiName ChangePassword
 * @apiGroup User
 * @apiPermission user
 *
 * @apiDescription Change password of current user.
 * 
 * @apiParam {Number} id User ID.
 * @apiParam {String} password New password
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiError DatabaseError Error with database.
 * @apiError UserNotFound Cannot find item by ID.
 * @apiError RequiredFieldMissing Required to fill all fields.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "User password update successful."
 * 		}
 */
router.put('/:id/password', userController.user_change_password);

/**
 *
 * @api {put} /protected/users/:id/profile Change user's profile
 * @apiVersion 0.1.0
 * @apiName ChangeProfile
 * @apiGroup User
 * @apiPermission user
 *
 * @apiDescription Change profile of current user.
 * 
 * @apiParam {Number} id User ID.
 * @apiParam {String} firstName New firstName.
 * @apiParam {String} lastName New lastName.
 * @apiParam {Date} dateOfBirth New DOB.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiError DatabaseError Error with database.
 * @apiError UserNotFound Cannot find item by ID.
 * @apiError RequiredFieldMissing Required to fill all fields.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "User profile update successful."
 * 		}
 */
router.put('/:id/profile', userController.user_update_profile);

/**
 *
 * @api {put} /protected/users/:id Delete user
 * @apiVersion 0.1.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission user
 *
 * @apiDescription Delete current account.
 * 
 * @apiParam {Number} id User ID.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiError DatabaseError Error with database.
 * @apiError UserNotFound Cannot find item by ID.
 * @apiError RequiredFieldMissing Required to fill all fields.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "User deleted."
 * 		}
 */
router.delete('/:id', userController.user_delete);

module.exports = router;
