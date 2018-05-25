var express = require('express');
var router = express.Router();

const searchController = require('../controllers/searchController');

/**
 *
 * @api {post} protected/search Search function
 * @apiVersion 0.1.0
 * @apiName SearchOrder
 * @apiGroup Search
 * @apiPermission user
 *
 * @apiDescription Create new order.
 *
 * @apiParam {String} search_string Search input.
 * @apiParam {Number} search_traveler_fee_gte Minimum mark for traveler fee search.
 * @apiParam {Number} search_traveler_fee_lte Maximum mark for traveler fee search.
 * @apiParam {Number} search_item_price_gte Minimum mark for item price search.
 * @apiParam {Number} search_item_price_lte Maximum mark for item price search.
 * @apiParam {Date} search_date_gte Minimum mark for date search.
 * @apiParam {Date} search_date_lte Maximum mark for date search.
 * @apiParam {Number} search_receiver_country Country code for country search.
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 * @apiSuccess {Object} orders Orders as results of the search.
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
 * 			status: "Show result",
 *          orders: []
 * 		}
 */
router.post('/', searchController.search);

module.exports = router;