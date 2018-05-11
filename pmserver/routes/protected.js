var express = require('express');
var router = express.Router();

var tokenAuthentication = require('../middleware/tokenAuthentication');

// Add tokenAuthentication as middleware
router.use(tokenAuthentication);

/**
 * @api {get} /protected Get the protected route page
 * @apiVersion 0.1.0
 * @apiName GetPrivateIndex
 * @apiGroup IndexPages
 * @apiPermission none
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
 *	 		status: "Welcome to primor protected routes"
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
 *			status: "Unable to get the protected index pages",
 *			err: {}
 *		}
 */
router.get('/', function(req, res) {
	// For testing
	return res.send({
		success: true,
		code: 200,
		status: "Welcome to primor protected routes"
	});
});

module.exports = router;
