var express = require('express');
var router = express.Router();

const tripController = require('../controllers/tripController');

/**
 * @api {get} protected/trips Get the list of all trip
 * @apiVersion 0.1.0
 * @apiName GetTripList
 * @apiGroup Trip
 * @apiPermission admin
 *
 * @apiDescription This will return the list of all trips.
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
 * 			status: "Item list received.",
 * 			trips: {
 *					"departureDate" : "2012 Jan 02",
 *					"arrivalDate": "2012 Jan 03",
 *					"departureAirport": "HAN",
 *					"arrivalAirport": "JFK"
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
router.get('/', tripController.trip_list);

router.get('/:id', tripController.get_trips);

/**
 *
 * @api {post} protected/trips Create new trip
 * @apiVersion 0.1.0
 * @apiName CreateTrip
 * @apiGroup Trip
 * @apiPermission user
 *
 * @apiDescription Create new Trip.
 *
 * @apiParam {Date} departure_date Date of departure.
 * @apiParam {Date} arrival_date Date of arrival.
 * @apiParam {String} departure_airport Name of the airport the owner will depart.
 * @apiParam {String} arrival_airport Name of the airport the owner will arrive.
 * @apiParam {Object} user Reference to the owner.
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
 * 			status: "Created trip successfully"
 * 		}
 */
router.post('/', tripController.create_trip);

/**
 *
 * @api {put} protected/trips/:id Update a Trip
 * @apiVersion 0.1.0
 * @apiName UpdateTrip
 * @apiGroup Trip
 * @apiPermission user
 *
 * @apiDescription Update a Trip.
 *
 * @apiParam {Number} id Trip ID.
 * @apiParam {Date} departure_date Date of departure.
 * @apiParam {Date} arrival_date Date of arrival.
 * @apiParam {String} departure_airport Name of the airport the owner will depart.
 * @apiParam {String} arrival_airport Name of the airport the owner will arrive.
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
 * 			status: "Updated trip successfully."
 * 		}
 */
router.put('/:id', tripController.edit_trip);

/**
 *
 * @api {delete} protected/trips/:id Delete a Trip
 * @apiVersion 0.1.0
 * @apiName DeleteTrip
 * @apiGroup Trip
 * @apiPermission user
 *
 * @apiDescription Delete a Trip.
 *
 * @apiParam {Number} id Trip ID.
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
 * 			status: "Deleted trip successfully"
 * 		}
 */
router.delete('/:id', tripController.delete_trip);

module.exports = router;
