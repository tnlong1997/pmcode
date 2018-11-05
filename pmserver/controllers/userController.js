var User = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/secret');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var async = require('async');

const sign_up_email = require('../middleware/emails/sign-up-email');
const forgot_password_email = require('../middleware/emails/forgot-password-email');
const reset_password_email = require('../middleware/emails/reset-password-email');
var notificationController = require("./notificationController");

// Display all user
exports.user_list = function(req, res) {

	User.find()
		.exec(function(err, user_list) {
			if (err) {
				return res.send({
					success: false,
					code: 400,
					err: err.message
				});
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
				code: 400,
				err: err.message,
			});
			return false;
		} else {

			// Save User to database
			newUser.save(function(err) {
				if (err) {
					res.send({
						success: false,
						code: 600,
						err: err,
					});
					return next(err);
				}
				sign_up_email(req.body.email, function(err) {
					if (!err) {
						res.send({
							success: false,
							code: 610,
							err: err,
						});
					}
				});
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
					code: 600,
					err: err
				});
			}

			if (!user) {
				return res.send({
					success: false,
					code: 601,
					err: "Authenticate failed. User not found"
				});
			}

			user.comparePassword(req.body.password, function(err, isMatch) {
				if (isMatch && !err) {
				// Create token if the password matched and no error was thrown
					var token = jwt.sign({email: user.email, _id: user._id}, secret, {
						expiresIn: 1000000000000000 // in seconds
					});

					var optionDict = {};
					var notification_message = "Welcome to Primor";
					var notification_message_id = notificationController.notify(user._id, optionDict, notification_message, res);
					res.json({
						success: true,
						code: 200,
						notification_message: notification_message,
						notification_message_id: notification_message_id,
						token: token,
					});
				} else if (!isMatch) {
					res.send({
						success: false,
						code: 610,
						err: 'Authentication failed. Passwords did not match.'
					});
				} else {
					res.send({
						success: false,
						code: 600,
						err: 'Database Error',
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

	User.findByIdAndUpdate(req.params.id, {$set: {password: encrytedNewPassword}}, function(err, user) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				err: "Error changing password"
			});
		}

		if (!user) {
			return res.send({
				success: false,
				code: 601,
				err: "Can't find user with given ID",
			});
		}

		var optionDict = {};
		var notification_message = "Your password has been changed";
		var notification_message_id = notificationController.notify(user._id, optionDict, notification_message, res);
					
		res.send({
			success: true,
			code: 200,
			notification_message: notification_message,
			notification_message_id: notification_message_id,
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

	User.findByIdAndRemove(req.params.id, function(err, user) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				err: "Error deleting user",
			});
		}

		if (!user) {
			return res.send({
				success: false,
				code: 601,
				err: "Can't find user with given ID"
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
				code: 600,
				err: "Error retrieving user's profile",
			});
		}

		if (!user) {
			return res.send({
				success: false,
				code: 601,
				err: "Can't find user with given ID",
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

	User.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, user) {
		if (err) {
			return res.send({
				success: false,
				code: 600,
				err: "Error updating profile",
			});
		}

		if (!user) {
			return res.send({
				success: false,
				code: 601,
				err: "Can't find user with given ID",
			});
		}
		var optionDict = {};
		var notification_message = "Welcome to Primor";
		var notification_message_id = notificationController.notify(user._id, optionDict, notification_message, res);
					
		res.send({
			success: true,
			code: 200,
			notification_message: notification_message,
			notification_message_id: notification_message_id,
			status: "Success updating profile",
		});
	});
};

exports.user_forgot_password = function (req, res) {

	// Using async to avoid multiple nested callbacks
	async.waterfall([
		function(done) {
			crypto.randomBytes(30, function(err, buf) {
				if (err) {
					return res.send({
						success: false,
						code: 600,
					});
				}
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			User.findOne({email: req.body.email}, function(err, user) {
				if (!user) {
					return res.send({
						success: false,
						code: 611,
						status: "Can't find requested email",
					});
				}

				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

				user.save(function(err) {
					if (err) {
						return res.send({
							success: false,
							code: 600,
						});
					}
					done(err, token, user.email);
				});

			});
		},
		function(token, email) {
			forgot_password_email(email, token, function(err) {
				if (err) {
					return res.send({
						success: false,
						code: 699,
					});
				}
			});

			return res.send({
				success: true,
				code: 200,
			});
		}]);
};

exports.user_reset_password_get = function(req, res) {
	User.findOne({resetPasswordToken: req.params.token}, function(err, user) {
		if (!user) {
			return res.send({
				success: false,
				code: 498,
				err: 'Invalid token',
			});
		}

		if (user.resetPasswordExpires < Date.now()) {
			return res.send({
				success: false,
				code: 497,
				err: 'Expired token'
			});
		}

		return res.send({
			success: true,
			code: 200,
			email: user.email,
		});
	});
};

exports.user_reset_password_post = function(req, res) {
	if (!req.body.password) {
		return res.send({
			success: false,
			code: 400,
			err: 'Require new password',
		});
	}

	async.waterfall([
		function(done) {
			User.findOne({resetPasswordToken: req.params.token}, function(err, user) {
				if (!user) {
					return res.send({
						success: false,
						code: 498,
						err: 'Invalid token',
					});
				}

				if (user.resetPasswordExpires < Date.now()) {
					return res.send({
						success: false,
						code: 497,
						err: 'Expired token'
					});
				}

				user.password = bcrypt.hashSync(req.body.password);
				user.resetPasswordToken = undefined;
				user.resetPasswordExpires = undefined;

				user.save(function(err) {
					if (err) {
						return res.send({
							success: false,
							code: 600,
						});
					}

					done(err, user.email);
				});
			});
		},
		function(email) {
			reset_password_email(email, function(err) {
				if (err) {
					return res.send({
						success: false,
						code: 699,
					});
				}
			});

			return res.send({
				success: true,
				code: 200,
			});
		}]);
};
