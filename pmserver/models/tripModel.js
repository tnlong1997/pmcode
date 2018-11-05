var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
	departureDate: {
		type: Date,
		required: true, 
		trim: true
	},
	arrivalDate: {
		type: Date, 
		required: true,
		trim: true
	},
	from: {
		type: String,
		required: true,
		trim: true,
	},
	to: {
		type: String,
		required: true,
		trim: true,
	}
});

var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
