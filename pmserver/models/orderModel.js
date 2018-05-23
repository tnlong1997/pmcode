var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	order_name: {
		type: String,
		required: true,
		trim: true
	},
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	traveler: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item',
		required: true
	},
	traveler_fee: {
		type: Number,
		required: true,
		trim: true
	},
	total_fee: {
		type: Number,
		required: true,
		trim: true
	},
	created_date_time: {
		type: Date,
		trim: true,
		default: Date.now
	},
	required_date_from: {
		type: Date,
		default: Date.now,
		required: true
	},
	required_date_to: {
		type: Date,
		default: Date.now,
		required: true
	}
});

orderSchema.index({order_name: 'text'});

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
