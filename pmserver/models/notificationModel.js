var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
	order: {
		type: mongoose.Schema.Types.ObjectId
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	notification_message: {
		type: String,
		required: true,
		trim: true
	},
	created_date_time: {
		type: Date,
		trim: true,
		default: Date.now
	}
});

var Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
