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
	departureAirport: {
		type: String, 
		required: true,
		// name: {
		// 	type: String,
		// 	required: true
		// },
		// address: {
		// 	street: {
		// 		type: String, 
		// 		required: true
		// 	},
		// 	city: {
		// 		type: String,
		// 		type: true
		// 	},
		// 	cc: {
		// 		type: String,
		// 		type: true
		// 	}
		// }
	},
	arrivalAirport: {
		type: String,
		required: true

		// name: {
		// 	type: String,
		// 	required: true
		// },
		// address: {
		// 	street: {
		// 		type: String, 
		// 		required: true
		// 	},
		// 	city: {
		// 		type: String,
		// 		type: true
		// 	},
		// 	cc: {
		// 		type: String,
		// 		type: true
		// 	}
		// }
		
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;