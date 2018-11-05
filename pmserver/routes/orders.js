var express = require('express');
var router = express.Router();

const orderController = require('../controllers/orderController');

/**
 * @api {get} protected/orders Get the list of all order
 * @apiVersion 0.1.0
 * @apiName GetOrderList
 * @apiGroup Order
 * @apiPermission admin
 *
 * @apiDescription This will return the list of all order.
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} items List of orders.
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
 * 			status: "Item list received.",
 * 			orders: {
 *					"created_date_time": "2018-04-24T18:36:46.138Z",
 *					"_id": "5adf793e33a7f13becf102be",
 *					"order_name": "Updated Name Check",
 *					"item": "5adf793e33a7f13becf102bd",
 *					"traveler_fee": 300,
 *					"total_fee": 0
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
router.get('/', orderController.order_list);

router.get('/buyer', orderController.order_list_buyer);

router.get('/traveler', orderController.order_list_traveler);

/**
 *
 * @api {post} protected/orders Create new order
 * @apiVersion 0.1.0
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiPermission user
 *
 * @apiDescription Create new order.
 *
 * @apiParam {String} order_name Name of the order.
 * @apiParam {Number} traveler_fee Minimum fee for shipping (User's input)
 * @apiParam {String} item_name Name of the item.
 * @apiParam {String} item_description Description of the item.
 * @apiParam {Number} item_price Price of the item.
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
 * 			status: "Order and Item Created."
 * 		}
 */
router.post('/', orderController.create_order);

/**
 *
 * @api {put} protected/orders/:id Update an Order
 * @apiVersion 0.1.0
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission user
 *
 * @apiDescription Update an Order.
 *
 * @apiParam {Number} id Order ID.
 * @apiParam {String} order_name Name of the order.
 * @apiParam {Number} traveler_fee Minimum fee for shipping (User's input)
 * @apiParam {String} item_name Name of the item.
 * @apiParam {String} item_description Description of the item.
 * @apiParam {Number} item_price Price of the item.
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
 * 			status: "Order update successful."
 * 		}
 */
router.put('/:id', orderController.edit_order);

/**
 *
 * @api {delete} protected/orders/:id Delete an Order
 * @apiVersion 0.1.0
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission user
 *
 * @apiDescription Delete an Order.
 *
 * @apiParam {Number} id Order ID.
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
 * 			status: "Successfully delete this order."
 * 		}
 */
router.delete('/:id', orderController.delete_order);

module.exports = router;
