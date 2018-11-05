var Notification = require("../models/notificationModel");

exports.notify = function(user_id, optionDict, notification_message, res) {
	var new_notification = new Notification({
		user: user_id,
		notification_message: notification_message
	});
    
	const keys = Object.keys(optionDict);
	for (var key in keys) {
		new_notification.key = optionDict[key];
	}

	new_notification.save(function(notification_err) {
		if (notification_err) {
			return res.send({
				success: false,
				code: 600,
				err: "Error saving notification to db"
			});
		}
		return new_notification._id;
	});
};