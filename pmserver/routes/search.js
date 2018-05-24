var express = require('express');
var router = express.Router();

const searchController = require('../controllers/searchController');

/**
 * @api {get} protected/search/order-name Search orders by order name
 * @apiVersion 0.1.0
 * @apiName SearchOrderByOrderName
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Search orders by order name using full-text search.
 *
 * @apiParam {String} search_string Search input
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} orders List of orders as the results of search.
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
 * 			status: "Show results.",
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
router.post('/order-name', searchController.search_order_name);

/**
 * @api {get} protected/search/item-name Search item by item name
 * @apiVersion 0.1.0
 * @apiName SearchItemByItemName
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Search items by item name using full-text search.
 *
 * @apiParam {String} search_string Search input
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} items List of items as the results of search.
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
 * 			status: "Show results.",
 * 			items: {
 *					"_id": "5adf793e33a7f13becf102be",
 *					"item": "5adf793e33a7f13becf102bd",
 *                  "item_price": 50
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
router.post('/item-name', searchController.search_item_name);

/**
 * @api {get} protected/search/item-price Search Item by item price
 * @apiVersion 0.1.0
 * @apiName SearchItemByItemPrice
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Search items by item prices with range.
 *
 * @apiParam {Number} search_price_gte Search input low point of the price.
 * @apiParam {Number} search_price_lte Search input high point of the price.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} items List of items as the results of search.
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
 * 			status: "Show results.",
 * 			items: {
 *					"created_date_time": "2018-04-24T18:36:46.138Z",
 *					"_id": "5adf793e33a7f13becf102be",
 *					"order_name": "Updated Name Check",
 *					"item": "5adf793e33a7f13becf102bd",
 *					"traveler_fee": 300,
 *					"total_fee": 0
 * 					}
 * 		}
 *
 */
router.post('/item-price', searchController.search_item_price);

/**
 * @api {get} protected/search/traveler-fee Search Order by traveler fee
 * @apiVersion 0.1.0
 * @apiName SearchOrderByTravelerFee
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Search orders by traveler fee with range.
 *
 * @apiParam {Number} search_price_gte Search input low point of the price.
 * @apiParam {Number} search_price_lte Search input high point of the price.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} orders List of orders as the results of search.
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
 * 			status: "Show results.",
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
 */
router.post('/traveler-fee', searchController.search_traveler_fee);

/**
 * @api {get} protected/search/date Search Order by date
 * @apiVersion 0.1.0
 * @apiName SearchOrderByDate
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Search orders by date.
 *
 * @apiParam {Date} search_date_gte Search input low point of the date.
 * @apiParam {Date} search_date_lte Search input high point of the date.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} orders List of orders as the results of search.
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
 * 			status: "Show results.",
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
 */
router.post('/date', searchController.search_date);

/**
 * @api {get} protected/search/item-price Search Orders by orders country code.
 * @apiVersion 0.1.0
 * @apiName SearchOrderByCountryCode
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Search orders by country code.
 *
 * @apiParam {Number} search_country Search input as country code.
 * 
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} orders List of orders as the results of search.
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
 * 			status: "Show results.",
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
 */
router.post('/receiver_country', searchController.search_receiver_country);

module.exports = router;