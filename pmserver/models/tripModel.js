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
	//Will add address after parsing info from map API
	departureAirport: {
		type: String, 
		required: true,
	},
	arrivalAirport: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;