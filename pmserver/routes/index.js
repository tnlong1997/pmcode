var express = require('express');
var router = express.Router();

/**
 * @api {get} / Get the index page
 * @apiVersion 0.1.0
 * @apiName GetIndex
 * @apiGroup IndexPages
 *
 * @apiSuccess {Boolean} success Status indicator.
 * @apiSuccess {Number} code Status code.
 * @apiSuccess {String} status Status description.
 *
 * @apiSuccessExample Success-Response:
 *	 	HTTP/1.1 200 OK
 *	 	{
 *	 		success: true,
 *	 		code: 200,
 *	 		status: "Welcome to primor."
 *	 	}
 * 
 *
 * @apiError {Boolean} success Status indicator.
 * @apiError {Number} code Status code.
 * @apiError {String} status Status description.
 * @apiError {Object} err Error objects.
 *
 * @apiErrorExample Error-Response:
 * 		HTTP/1.1 400 Bad Request
 *		{
 *			success: false,
 *			code: 400,
 *			status: "Unable to get the index pages",
 *			err: {}
 *		}
 */
router.get('/', function(req, res, err) {
	if (err) {
		return res.send({
			success: false,
			code: 400,
			status: "Unable to get the index pages",
			err: err
		});
	}
	return res.send({
		success: true, 
		code: 200,
		status: "Welcome to primor."
	});
});

module.exports = router;
