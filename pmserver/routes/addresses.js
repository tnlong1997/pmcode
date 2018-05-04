var express = require('express');
var router = express.Router();

const addressController = require('../controllers/addressController');

/**
 * @api {get} protected/addresses Get the list of all addresses
 * @apiVersion 0.1.0
 * @apiName GetAddressList
 * @apiGroup Address
 * @apiPermission admin
 *
 * @apiDescription This will return the list of all addresses.
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} items List of trips.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Address list received.",
 * 			addresses : {
 *					"fullname" : "Hoang Nguyen",
 *					"address_1": "abc",
 *					"address_2": "def",
 *					"city": "hanoi",
 *					"country": "USA"
 * 					}
 * 		}
 *
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 600 Database Error
 *		{
 *			success: false,
 *			code: 600,
 *			status: "Unable to access to database",
 *			err: DatabaseError
 *		}
 *
 */
router.get('/', addressController.address_list);

/**
 *
 * @api {post} protected/addresses Create new address
 * @apiVersion 0.1.0
 * @apiName CreateAddress
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiDescription Create new Address.
 *
 * @apiParam {String} fullname Name indicates this address.
 * @apiParam {String} address_1 Address Line 1.
 * @apiParam {String} address_2 Address Line 2.
 * @apiParam {String} city Address city.
 * @apiParam {String} country Address country.
 * @apiParam {Object} user Reference to owner.
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Created address successfully"
 * 		}
 */
router.post('/', addressController.create_address);

/**
 *
 * @api {put} protected/addresses/:id Update an Address
 * @apiVersion 0.1.0
 * @apiName UpdateAddress
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiDescription Update aan Address.
 *
 * @apiParam {Number} id Address ID.
 * @apiParam {String} fullname Name indicates this address.
 * @apiParam {String} address_1 Address Line 1.
 * @apiParam {String} address_2 Address Line 2.
 * @apiParam {String} city Address city.
 * @apiParam {String} country Address country.
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Updated address successfully."
 * 		}
 */
router.put('/:id', addressController.edit_address);

/**
 *
 * @api {delete} protected/addresses/:id Delete an Address
 * @apiVersion 0.1.0
 * @apiName DeleteAddress
 * @apiGroup Address
 * @apiPermission user
 *
 * @apiDescription Delete an Address.
 *
 * @apiParam {Number} id Address ID.
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Deleted address successfully"
 * 		}
 */
router.delete('/:id', addressController.delete_address);

module.exports = router;
