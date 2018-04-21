var express = require('express');
var router = express.Router();

/**
 * @api {get} / Get the index page
 * @apiVersion 0.1.0
 * @apiName GetIndex
 * @apiGroup IndexPages
 *
 * @apiSuccess {String} status Welcome to Primor.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Welcome to Primor."
 *     }
 *
 * @apiError GetError Unable to get the index pages
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "GetError"
 *     }
 */
router.get('/', function(req, res) {
	return res.send('Welcome to primor.');
});

module.exports = router;
