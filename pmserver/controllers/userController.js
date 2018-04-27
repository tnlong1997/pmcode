var User = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/secret');
var jwt = require('jsonwebtoken');

// Display all user
exports.user_list = function(req, res, next) {

	User.find()
		.exec(function(err, user_list) {
			if (err) {
				return next(err);
			}
			res.send({
				success: true,
				code: 200,
				data: user_list,
			});
		});

};

exports.user_sign_up = function(req, res, next) {
	req.body.password = bcrypt.hashSync(req.body.password);
	var newUser = new User(
		req.body
	);

	// Check if user username and password is valid
	newUser.validate(function(err) {

		if (err) {
			res.send({
				success: false,
				code: 402,
				err: err.message,
			});
			return false;
		} else {

			// Save User to database
			newUser.save(function(err) {
				if (err) {
					res.send({
						success: false,
						code: 400,
						err: err,
					});
					return next(err);
				}
				res.send({
					success: true,
					code: 200,
					user_id: newUser._id,
				});
			});

		}

	});
};

// User login
exports.user_log_in = function(req, res) {

	if (!req.body.email) {
		return res.send({
			success: false,
			code: 400,
			err: "No email in input"
		});
	}

	if (!req.body.password) {
		return res.send({
			success: false,
			code: 400,
			err: "No password in input"
		});
	}

	User.findOne({email: req.body.email})
		.exec(function(err, user) {
			if (err) {
				return res.send({
					success: false,
					code: 400,
					err: err
				});
			}

			if (!user) {
				return res.send({
					success: false,
					code: 400,
					err: "Authenticate failed. User not found"
				});
			}

			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
				// Create token if the password matched and no error was thrown
					var token = jwt.sign({email: user.email, _id: user._id}, secret, {
						expiresIn: 1000000000000000 // in seconds
					});
					res.json({
						success: true,
						code: 200,
						token: token,
					});
				} else {
					res.send({
						success: false,
						message: 'Authentication failed. Passwords did not match.'
					});
				}
			});
		});
};

// Change user's password
exports.user_change_password = function(req, res) {

	if (!req.params.id) {
		return res.send({
			success: false,
			code: 400,
			err: "No userId in req",
		});
	}

	if (!req.body.newPassword) {
		return res.send({
			success: false,
			code: 400,
			err: "No newPassword in req",
		});
	}

	var encrytedNewPassword = bcrypt.hashSync(req.body.newPassword);

	User.findByIdAndUpdate(req.params.id, {$set: {password: encrytedNewPassword}}, function(err) {
		if (err) {
			return res.send({
				success: false,
				code: 400,
				err: "Error changing password"
			});
		}

		res.send({
			success: true,
			code: 200,
			status: "Successfully change password"
		});
	});
};

// Delete user
exports.user_delete = function(req, res) {
	if (!req.params.id) {
		return res.send({
			success: false,
			code: 400,
			err: "No id in req",
		});
	}

	User.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			return res.send({
				success: false,
				code: 400,
				err: "Error deleting user",
			});
		}

		res.send({
			success: true,
			code: 200,
			status: "Successfully delete user"
		});
	});
};

// Get user's profile
exports.user_get_profile = function(req, res) {
	if (!req.params.id) {
		return res.send({
			success: false,
			code: 400,
			err: "No id in req",
		});
	}

	User.findById(req.params.id, function(err, user) {
		if (err) {
			return res.send({
				success: false,
				code: 400,
				err: "Error retrieving user's profile",
			});
		}

		return res.send({
			success: false,
			code: 200,
			profile: user.profile
		});
	});
};


//Update profile
exports.user_update_profile = function(req, res) {
	if (!req.params.id) {
		return res.send({
			success: false,
			code: 400,
			err: "No id in req",
		});
	}

	if (!req.body) {
		return res.send({
			success: false,
			code: 400,
			err: "No info to be updated",
		});
	}

	User.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err) {
		if (err) {
			return res.send({
				success: false,
				code: 400,
				err: "Error updating profile",
			});
		}

		res.send({
			success: true,
			code: 200,
			status: "Success updating profile",
		});
	});
};
