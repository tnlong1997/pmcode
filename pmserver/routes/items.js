var express = require('express');
var router = express.Router();

const itemController = require('../controllers/itemController');

/**
 * @api {get} /items Get the list of all item.
 * @apiVersion 0.1.0
 * @apiName GetItemList
 * @apiGroup Item
 * @apiPermission admin
 *
 * @apiDescription This will return the list of all items and can only be accessed by admin
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} items List of items.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Item list received.",
 * 			items: {
 *					"_id": "5adaa1a33ab44a3d18f41bd9",
 *					"item_name": "New Item",
 *					"item_description": "check",
 *					"item_price": 40
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
router.get('/', itemController.item_list);

/**
 *
 * @api {post} /items Create new Item
 * @apiVersion 0.1.0
 * @apiName CreateItem
 * @apiGroup Item
 * @apiPermission none
 *
 * @apiDescription Create new Item.
 *
 * @apiParam {String} item_name Name of the item.
 * @apiParam {String} item_description Description of the item.
 * @apiParam {Number} item_price Price of the item.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 *
 * @apiError DatabaseError Error with database.
 * @apiError RequiredFieldMissing Required to fill all fields.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Item Created."
 * 		}
 */
router.post('/', itemController.create_item);

/**
 *
 * @api {put} /items/:id Update an Item
 * @apiVersion 0.1.0
 * @apiName UpdateItem
 * @apiGroup Item
 * @apiPermission none
 *
 * @apiDescription Update an Item.
 *
 * @apiParam {Number} id Item ID.
 * @apiParam {String} item_name Name of the item.
 * @apiParam {String} item_description Description of the item.
 * @apiParam {Number} item_price Price of the item.
 *
 * @apiError 400 Bad Request
 * @apiError 498 Invalid token
 * @apiError 499 Token required
 * @apiError 600 Database error
 * @apiError 601 Unable to find items with given ID
 *
 * @apiError DatabaseError Error with database.
 * @apiError ItemNotFound Cannot find item by ID.
 *
 * @apiSuccessExample Success-Response:
 * 		HTTP/1.1 200 OK
 * 		{
 * 			success: true,
 * 			code: 200,
 * 			status: "Item update successful."
 * 		}
 */
router.put('/:id', itemController.edit_item);

/**
 *
 * @api {delete} /items/:id Delete an Item
 * @apiVersion 0.1.0
 * @apiName DeleteItem
 * @apiGroup Item
 * @apiPermission admin
 *
 * @apiDescription Delete an Item.
 *
 * @apiParam {Number} id Item ID.
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
 * 			status: "Successfully delete this item."
 * 		}
 */
router.delete('/:id', itemController.delete_item);

module.exports = router;
