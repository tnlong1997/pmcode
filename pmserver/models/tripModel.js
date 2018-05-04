var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
	departure_date: {
		type: Date,
		required: true, 
		trim: true
	},
	arrival_date: {
		type: Date, 
		required: true,
		trim: true
	},
	//Will add address after parsing info from map API
	departure_airport: {
		type: String, 
		required: true,
	},
	arrival_airport: {
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