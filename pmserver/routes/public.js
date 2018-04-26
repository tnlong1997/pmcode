var express = require('express');
var router = express.Router();

// router.use('/users', users_public);


/**
 * @api {get} /public Get the public route page
 * @apiVersion 0.1.0
 * @apiName GetPublicIndex
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
 *	 		status: "Welcome to primor public routes"
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
 *			status: "Unable to get the public index pages",
 *			err: {}
 *		}
 */
router.get('/', function(req, res) {
	res.send({
		success: true,
	 	code: 200,
	 	status: "Welcome to primor public routes"
	});
});

module.exports = router;
