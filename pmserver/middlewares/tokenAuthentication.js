var jwt = require('jsonwebtoken');

var secret = require('../config/secret');

module.exports = function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['jwt'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, secret, function(err, decoded) {
			if (err) {
				return res.send({
					success: false,
					code: 400,
					err: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.token = decoded;
				next();
			}
		});

	} else {

		// if there is no token, return an error
		return res.send({
			success: false,
			code: 400,
			err: 'No token provided.'
		});

	}

};
